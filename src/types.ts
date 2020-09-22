import { DataQuery, DataSourceJsonData } from '@grafana/data';

interface JsonField {
  name: string;
  jsonPath: string;
}

export interface JsonApiQuery extends DataQuery {
  fields: JsonField[];
  cacheDurationSeconds: number;
}

export interface JsonApiVariableQuery extends DataQuery {
  jsonPath: string;
}

export const defaultQuery: Partial<JsonApiQuery> = {
  fields: [{ name: '', jsonPath: '' }],
  cacheDurationSeconds: 300,
};

export interface JsonApiDataSourceOptions extends DataSourceJsonData {
  url: string;
  queryParams?: string;
}

export interface JsonApiSecureJsonData {}
