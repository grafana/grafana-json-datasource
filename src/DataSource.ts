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

import API from './api';
import { JsonApiQuery, JsonApiVariableQuery, JsonApiDataSourceOptions } from './types';

export class DataSource extends DataSourceApi<JsonApiQuery, JsonApiDataSourceOptions> {
  api: API;
  queryParams: string;

  constructor(instanceSettings: DataSourceInstanceSettings<JsonApiDataSourceOptions>) {
    super(instanceSettings);
    this.api = new API(instanceSettings.url!);
    this.queryParams = instanceSettings.jsonData.queryParams || '';
  }

  async query(request: DataQueryRequest<JsonApiQuery>): Promise<DataQueryResponse> {
    const promises = request.targets.map(async query => {
      const response = await this.api.cachedGet(query.cacheDurationSeconds, this.queryParams);

      const fields = query.fields
        .filter(field => field.jsonPath)
        .map(field => {
          const values = JSONPath({ path: field.jsonPath, json: response });

          // Get the path for automatic setting of the field name.
          //
          // Casted to any due to typing issues with JSONPath-Plus
          const paths = (JSONPath as any).toPathArray(field.jsonPath);

          const [type, newvals] = detectFieldType(values);

          return {
            name: field.name || paths[paths.length - 1],
            type: type,
            values: newvals,
          };
        });

      if (Array.from(new Set(fields.map(field => field.values.length))).length > 1) {
        throw new Error('Fields have different lengths');
      }

      return toDataFrame({
        refId: query.refId,
        fields: fields,
      });
    });

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
    return JSONPath({ path: query.jsonPath, json: await this.api.get() }).map((_: any) => ({ text: _ }));
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
 */
const detectFieldType = (values: any[]): [FieldType, any[]] => {
  const isValidISO = values.every(value => isValid(parseISO(value)));
  if (isValidISO) {
    return [FieldType.time, values.map(_ => parseISO(_).valueOf())];
  }

  const isNumber = values.every(value => typeof value === 'number');
  if (isNumber) {
    const uniqueLengths = Array.from(new Set(values.map(value => value.toString().length)));

    if (uniqueLengths.length === 1 && uniqueLengths[0] === 13) {
      return [FieldType.time, values];
    }
    if (uniqueLengths.length === 1 && uniqueLengths[0] === 10) {
      return [FieldType.time, values.map(_ => _ * 1000.0)];
    }
    return [FieldType.number, values];
  }

  const isBoolean = values.every(value => typeof value === 'boolean');
  if (isBoolean) {
    return [FieldType.boolean, values];
  }

  return [FieldType.string, values];
};
