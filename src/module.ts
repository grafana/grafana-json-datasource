import { DataSourcePlugin } from '@grafana/data';
import { DataSource } from './datasource';
import { ConfigEditor } from './components/ConfigEditor';
import { DashboardQueryEditor } from './components/DashboardQueryEditor';
import { VariableQueryEditor } from './components/VariableQueryEditor';
import { JsonApiQuery, JsonApiDataSourceOptions } from './types';

export const plugin = new DataSourcePlugin<DataSource, JsonApiQuery, JsonApiDataSourceOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(DashboardQueryEditor)
  .setVariableQueryEditor(VariableQueryEditor);
