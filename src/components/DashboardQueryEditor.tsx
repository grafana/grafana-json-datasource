import React from 'react';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from '../datasource';
import { JsonApiDataSourceOptions, JsonApiQuery } from '../types';
import { QueryEditor } from './QueryEditor';

type Props = QueryEditorProps<DataSource, JsonApiQuery, JsonApiDataSourceOptions>;

export const DashboardQueryEditor: React.FC<Props> = ({ onRunQuery, onChange, query }) => {
  return <QueryEditor onRunQuery={onRunQuery} onChange={onChange} query={query} />;
};
