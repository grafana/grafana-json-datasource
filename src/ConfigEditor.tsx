import React from 'react';
import { DataSourceHttpSettings } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { MyDataSourceOptions } from './types';

interface Props extends DataSourcePluginOptionsEditorProps<MyDataSourceOptions> {}

export const ConfigEditor: React.FC<Props> = ({ options, onOptionsChange }) => {
  return (
    <DataSourceHttpSettings defaultUrl="http://localhost:8080" dataSourceConfig={options} onChange={onOptionsChange} />
  );
};
