import _ from 'lodash';
import { isValid, parseISO } from 'date-fns';
import { JSONPath } from 'jsonpath-plus';

import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  toDataFrame,
  MetricFindValue,
  FieldType,
  ScopedVars,
  TimeRange,
} from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';

import API from './api';
import { JsonApiQuery, JsonApiDataSourceOptions, Pair } from './types';

export class JsonDataSource extends DataSourceApi<JsonApiQuery, JsonApiDataSourceOptions> {
  api: API;

  constructor(instanceSettings: DataSourceInstanceSettings<JsonApiDataSourceOptions>) {
    super(instanceSettings);

    this.api = new API(instanceSettings.url!, instanceSettings.jsonData.queryParams || '');
  }

  /**
   * metadataRequest is used by the language provider to return the JSON
   * document to generate suggestions for the QueryField.
   *
   * This is a custom method and is not part of the DataSourceApi, feel free to
   * name it as you like.
   */
  async metadataRequest(query: JsonApiQuery, range?: TimeRange) {
    return this.requestJson(query, replace({}, range));
  }

  async query(request: DataQueryRequest<JsonApiQuery>): Promise<DataQueryResponse> {
    const promises = request.targets.map((query) => this.doRequest(query, request.range, request.scopedVars));

    // Wait for all queries to finish before returning the result.
    return Promise.all(promises).then((data) => ({ data }));
  }

  /**
   * Returns values for a Query variable.
   *
   * @param query
   */
  async metricFindQuery?(query: JsonApiQuery): Promise<MetricFindValue[]> {
    const frame = await this.doRequest(query);
    return frame.fields[0].values.toArray().map((_) => ({ text: _ }));
  }

  /**
   * This line adds support for annotation queries in >=7.2.
   */
  annotations = {};

  /**
   * Checks whether we can connect to the API.
   */
  async testDatasource() {
    const defaultErrorMessage = 'Cannot connect to API';

    try {
      const response = await this.api.test();

      if (response.status === 200) {
        return {
          status: 'success',
          message: 'Success',
        };
      } else {
        return {
          status: 'error',
          message: response.statusText ? response.statusText : defaultErrorMessage,
        };
      }
    } catch (err) {
      if (_.isString(err)) {
        return {
          status: 'error',
          message: err,
        };
      } else {
        let message = 'JSON API: ';
        message += err.statusText ? err.statusText : defaultErrorMessage;
        if (err.data && err.data.error && err.data.error.code) {
          message += ': ' + err.data.error.code + '. ' + err.data.error.message;
        }

        return {
          status: 'error',
          message,
        };
      }
    }
  }

  async doRequest(query: JsonApiQuery, range?: TimeRange, scopedVars?: ScopedVars) {
    const replaceWithVars = replace(scopedVars, range);

    const json = await this.requestJson(query, replaceWithVars);

    if (!json) {
      throw new Error('Query returned empty data');
    }

    const fields = query.fields
      .filter((field) => field.jsonPath)
      .map((field) => {
        const path = replaceWithVars(field.jsonPath);
        const values = JSONPath({ path, json });

        // Get the path for automatic setting of the field name.
        //
        // Casted to any due to typing issues with JSONPath-Plus
        const paths = (JSONPath as any).toPathArray(path);

        const propertyType = field.type ? field.type : detectFieldType(values);
        const typedValues = parseValues(values, propertyType);

        return {
          name: paths[paths.length - 1],
          type: propertyType,
          values: typedValues,
        };
      });

    const fieldLengths = fields.map((field) => field.values.length);
    const uniqueFieldLengths = Array.from(new Set(fieldLengths)).length;

    // All fields need to have the same length for the data frame to be valid.
    if (uniqueFieldLengths > 1) {
      throw new Error('Fields have different lengths');
    }

    return toDataFrame({
      name: query.refId,
      refId: query.refId,
      fields: fields,
    });
  }

  async requestJson(query: JsonApiQuery, interpolate: (text: string) => string) {
    const interpolateKeyValue = ([key, value]: Pair<string, string>): Pair<string, string> => {
      return [interpolate(key), interpolate(value)];
    };

    return await this.api.cachedGet(
      query.cacheDurationSeconds,
      query.method,
      interpolate(query.urlPath),
      (query.params ?? []).map(interpolateKeyValue),
      (query.headers ?? []).map(interpolateKeyValue),
      interpolate(query.body)
    );
  }
}

const replace = (scopedVars?: any, range?: TimeRange) => (str: string): string => {
  return replaceMacros(getTemplateSrv().replace(str, scopedVars), range);
};

// replaceMacros substitutes all available macros with their current value.
const replaceMacros = (str: string, range?: TimeRange) => {
  return range
    ? str
        .replace(/\$__unixEpochFrom\(\)/g, range.from.unix().toString())
        .replace(/\$__unixEpochTo\(\)/g, range.to.unix().toString())
    : str;
};

/**
 * Detects the field type from an array of values.
 */
export const detectFieldType = (values: any[]): FieldType => {
  // If all values are null, default to strings.
  if (values.every((_) => _ === null)) {
    return FieldType.string;
  }

  // If all values are valid ISO 8601, then assume that it's a time field.
  const isValidISO = values
    .filter((value) => value !== null)
    .every((value) => value.length >= 10 && isValid(parseISO(value)));
  if (isValidISO) {
    return FieldType.time;
  }

  if (values.every((value) => typeof value === 'number')) {
    const uniqueLengths = Array.from(new Set(values.map((value) => Math.round(value).toString().length)));
    const hasSameLength = uniqueLengths.length === 1;

    // If all the values have the same length of either 10 (seconds) or 13
    // (milliseconds), assume it's a time field. This is not always true, so we
    // might need to add an option to disable detection of time fields.
    if (hasSameLength) {
      if (uniqueLengths[0] === 13) {
        return FieldType.time;
      }
      if (uniqueLengths[0] === 10) {
        return FieldType.time;
      }
    }

    return FieldType.number;
  }

  if (values.every((value) => typeof value === 'boolean')) {
    return FieldType.boolean;
  }

  return FieldType.string;
};

/**
 * parseValues converts values to the given field type.
 */
export const parseValues = (values: any[], type: FieldType): any[] => {
  switch (type) {
    case FieldType.time:
      // For time field, values are expected to be numbers representing a Unix
      // epoch in milliseconds.

      if (values.filter((_) => _).every((value) => typeof value === 'string')) {
        return values.map((_) => (_ !== null ? parseISO(_).valueOf() : _));
      }

      if (values.filter((_) => _).every((value) => typeof value === 'number')) {
        const ms = 1_000_000_000_000;

        // If there are no "big" numbers, assume seconds.
        if (values.filter((_) => _).every((_) => _ < ms)) {
          return values.map((_) => (_ !== null ? _ * 1000.0 : _));
        }

        // ... otherwise assume milliseconds.
        return values;
      }

      throw new Error('Unsupported time property');
    case FieldType.string:
      return values.every((_) => typeof _ === 'string') ? values : values.map((_) => (_ !== null ? _.toString() : _));
    case FieldType.number:
      return values.every((_) => typeof _ === 'number') ? values : values.map((_) => (_ !== null ? parseFloat(_) : _));
    case FieldType.boolean:
      return values.every((_) => typeof _ === 'boolean')
        ? values
        : values.map((_) => {
            if (_ === null) {
              return _;
            }

            switch (_.toString()) {
              case '0':
              case 'false':
              case 'FALSE':
              case 'False':
                return false;
              case '1':
              case 'true':
              case 'TRUE':
              case 'True':
                return true;
              default:
                throw new Error('Found non-boolean values in a field of type boolean: ' + _.toString());
            }
          });
    default:
      throw new Error('Unsupported field type');
  }
};
