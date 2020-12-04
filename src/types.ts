import { DataQuery, DataSourceJsonData } from '@grafana/data';

interface JsonField {
  name: string;
  jsonPath: string;
}

export interface JsonApiQuery extends DataQuery {
  fields: JsonField[];
  cacheDurationSeconds: number;
  queryParams: string;
  urlPath: string;
}

export interface JsonApiVariableQuery extends DataQuery {
  jsonPath: string;
  queryParams: string;
  urlPath: string;
}

export const defaultQuery: Partial<JsonApiQuery> = {
  fields: [{ name: '', jsonPath: '' }],
  cacheDurationSeconds: 300,
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
