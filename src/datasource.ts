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
} from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';

import API from './api';
import { JsonApiQuery, JsonApiVariableQuery, JsonApiDataSourceOptions } from './types';

export class DataSource extends DataSourceApi<JsonApiQuery, JsonApiDataSourceOptions> {
  api: API;

  constructor(instanceSettings: DataSourceInstanceSettings<JsonApiDataSourceOptions>) {
    super(instanceSettings);
    this.api = new API(instanceSettings.url!, instanceSettings.jsonData.queryParams || '');
  }

  async query(request: DataQueryRequest<JsonApiQuery>): Promise<DataQueryResponse> {
    const templateSrv = getTemplateSrv();

    const replaceMacros = (str: string) => {
      return str
        .replace(/\$__unixEpochFrom\(\)/g, request.range.from.unix().toString())
        .replace(/\$__unixEpochTo\(\)/g, request.range.to.unix().toString());
    };

    const promises = request.targets.map(async query => {
      const queryParamsTreated = replaceMacros(templateSrv.replace(query.queryParams, request.scopedVars));
      const urlPathTreated = templateSrv.replace(query.urlPath, request.scopedVars);

      const response = await this.api.cachedGet(query.cacheDurationSeconds, urlPathTreated, queryParamsTreated);

      const fields = query.fields
        .filter(field => field.jsonPath)
        .map(field => {
          const jsonPathTreated = replaceMacros(templateSrv.replace(field.jsonPath, request.scopedVars));
          const nameTreated = templateSrv.replace(field.name, request.scopedVars);

          const values = JSONPath({ path: jsonPathTreated, json: response });

          // Get the path for automatic setting of the field name.
          //
          // Casted to any due to typing issues with JSONPath-Plus
          const paths = (JSONPath as any).toPathArray(jsonPathTreated);

          const propertyType = field.type ? field.type : detectFieldType(values);
          const typedValues = parseValues(values, propertyType);

          return {
            name: nameTreated || paths[paths.length - 1],
            type: propertyType,
            values: typedValues,
          };
        });

      const fieldLengths = fields.map(field => field.values.length);
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
    });

    // Wait for all queries to finish before returning the result.
    return Promise.all(promises).then(data => ({ data }));
  }

  /**
   * Returns values for a Query variable.
   *
   * @param query
   */
  async metricFindQuery?(query: JsonApiVariableQuery): Promise<MetricFindValue[]> {
    if (!query.jsonPath) {
      return [];
    }

    const templateSrv = getTemplateSrv();

    const queryParamsTreated = templateSrv.replace(query.queryParams);
    const urlPathTreated = templateSrv.replace(query.urlPath);
    const jsonPathTreated = templateSrv.replace(query.jsonPath);

    const response = await this.api.get(urlPathTreated, queryParamsTreated);

    return JSONPath({
      path: jsonPathTreated,
      json: response,
    }).map((_: any) => ({ text: _ }));
  }

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
}

/**
 * Detects the field type from an array of values.
 */
export const detectFieldType = (values: any[]): FieldType => {
  // If all values are null, default to strings.
  if (values.every(_ => _ === null)) {
    return FieldType.string;
  }

  // If all values are valid ISO 8601, then assume that it's a time field.
  const isValidISO = values
    .filter(value => value !== null)
    .every(value => value.length >= 10 && isValid(parseISO(value)));
  if (isValidISO) {
    return FieldType.time;
  }

  if (values.every(value => typeof value === 'number')) {
    const uniqueLengths = Array.from(new Set(values.map(value => Math.round(value).toString().length)));
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

  if (values.every(value => typeof value === 'boolean')) {
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

      if (values.every(value => typeof value === 'string')) {
        return values.map(_ => (_ !== null ? parseISO(_).valueOf() : null));
      }

      if (values.every(value => typeof value === 'number')) {
        const ms = 1_000_000_000_000;

        // If there are no "big" numbers, assume seconds.
        if (values.every(_ => _ < ms)) {
          return values.map(_ => _ * 1000.0);
        }

        // ... otherwise assume milliseconds.
        return values;
      }

      throw new Error('Unsupported time property');
    case FieldType.string:
      return values.every(_ => typeof _ === 'string') ? values : values.map(_ => _.toString());
    case FieldType.number:
      return values.every(_ => typeof _ === 'number') ? values : values.map(_ => parseFloat(_));
    case FieldType.boolean:
      return values.every(_ => typeof _ === 'boolean')
        ? values
        : values.map(_ => {
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
                throw new Error('Found non-boolean values in a field of type boolean');
            }
          });
    default:
      throw new Error('Unsupported field type');
  }
};
