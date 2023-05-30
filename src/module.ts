import { DataSourcePlugin } from '@grafana/data';
import { ConfigEditor } from './components/ConfigEditor';
import { QueryEditor } from './components/QueryEditor';
import { VariableQueryEditor } from './components/VariableQueryEditor';
import { JsonDataSource } from './datasource';
import { JsonApiDataSourceOptions, JsonApiQuery } from './types';

export const plugin = new DataSourcePlugin<JsonDataSource, JsonApiQuery, JsonApiDataSourceOptions>(JsonDataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor)
  .setVariableQueryEditor(VariableQueryEditor);
