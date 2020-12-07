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

          const [type, newvals] = detectFieldType(values);

          return {
            name: nameTreated || paths[paths.length - 1],
            type: type,
            values: newvals,
          };
        });

      const fieldLengths = fields.map(field => field.values.length);

      // All fields need to have the same length for the data frame to be valid.
      if (Array.from(new Set(fieldLengths)).length > 1) {
        throw new Error('Fields have different lengths');
      }

      return toDataFrame({
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
 * Detects the type of the values, and converts values if necessary.
 *
 * @param values - The field values.
 * @returns the detected field type and potentially converted values.
 */
export const detectFieldType = (values: any[]): [FieldType, any[]] => {
  if (values.every(_ => _ === null)) {
    return [FieldType.string, values];
  }
  // If all values are valid ISO 8601, the assume that it's a time field.
  const isValidISO = values
    .filter(value => value !== null)
    .every(value => value.length >= 10 && isValid(parseISO(value)));
  if (isValidISO) {
    return [FieldType.time, values.map(_ => (_ !== null ? parseISO(_).valueOf() : null))];
  }

  const isNumber = values.every(value => typeof value === 'number');
  if (isNumber) {
    const uniqueLengths = Array.from(new Set(values.map(value => value.toString().length)));
    const hasSameLength = uniqueLengths.length === 1;

    // If all the values have the same length of either 10 (seconds) or 13
    // (milliseconds), assume it's a time field. This is not always true, so we
    // might need to add an option to disable detection of time fields.
    if (hasSameLength) {
      if (uniqueLengths[0] === 13) {
        return [FieldType.time, values];
      }
      if (uniqueLengths[0] === 10) {
        return [FieldType.time, values.map(_ => _ * 1000.0)];
      }
    }

    return [FieldType.number, values];
  }

  const isBoolean = values.every(value => typeof value === 'boolean');
  if (isBoolean) {
    return [FieldType.boolean, values];
  }

  return [FieldType.string, values];
};
