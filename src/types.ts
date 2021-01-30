import { DataQuery, DataSourceJsonData, FieldType } from '@grafana/data';

interface JsonField {
  name: string;
  jsonPath: string;
  type?: FieldType;
}

export type Pair<T, K> = [T, K];

export interface JsonApiQuery extends DataQuery {
  fields: JsonField[];
  method: string;
  urlPath: string;
  queryParams: string;
  params: Array<Pair<string, string>>;
  headers: Array<Pair<string, string>>;
  body: string;
  cacheDurationSeconds: number;
}

export interface JsonApiVariableQuery extends DataQuery {
  jsonPath: string;
  queryParams: string;
  urlPath: string;
}

export const defaultQuery: Partial<JsonApiQuery> = {
  cacheDurationSeconds: 300,
  method: 'GET',
  queryParams: '',
  urlPath: '',
};

export const defaultVariableQuery: Partial<JsonApiVariableQuery> = {
  jsonPath: '',
  queryParams: '',
  urlPath: '',
};

export interface JsonApiDataSourceOptions extends DataSourceJsonData {
  queryParams?: string;
}
