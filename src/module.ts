import { DataSourcePlugin } from '@grafana/data';
import { JsonDataSource } from './datasource';
import { ConfigEditor } from './components/ConfigEditor';
import { QueryEditor } from './components/QueryEditor';
import { VariableQueryEditor } from './components/VariableQueryEditor';
import { JsonApiQuery, JsonApiDataSourceOptions } from './types';

export const plugin = new DataSourcePlugin<JsonDataSource, JsonApiQuery, JsonApiDataSourceOptions>(JsonDataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor)
  .setVariableQueryEditor(VariableQueryEditor);
