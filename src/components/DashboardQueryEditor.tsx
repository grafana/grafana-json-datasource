import React from 'react';
import { QueryEditorProps } from '@grafana/data';
import { JsonDataSource } from '../datasource';
import { JsonApiDataSourceOptions, JsonApiQuery } from '../types';
import { QueryEditor } from './QueryEditor';

type Props = QueryEditorProps<JsonDataSource, JsonApiQuery, JsonApiDataSourceOptions>;

export const DashboardQueryEditor: React.FC<Props> = (props) => {
  return <QueryEditor {...props} disableSuggestions={false} />;
};
