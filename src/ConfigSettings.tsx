import React, { ChangeEvent } from 'react';

import { DataSourcePluginOptionsEditorProps } from '@grafana/data';

import { Field, Input } from '@grafana/ui';
import { MyDataSourceOptions } from './types';
import {} from '@emotion/core';

type Props = Pick<DataSourcePluginOptionsEditorProps<MyDataSourceOptions>, 'options' | 'onOptionsChange'>;

export const ConfigSettings: React.FC<Props> = ({ options, onOptionsChange }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...options.jsonData,
        queryParams: e.currentTarget.value,
      },
    });
  };
  return (
    <Field label="Query parameters" description="Add custom query parameters to your query." className="width-16">
      <Input value={options.jsonData.queryParams} onChange={onChange} placeholder="page=1&limit=100" />
    </Field>
  );
};
