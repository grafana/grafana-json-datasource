import React, { ChangeEvent } from 'react';
import { InlineFormLabel, Input, Legend } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { JsonApiDataSourceOptions } from './types';
import {} from '@emotion/core';

interface Props extends DataSourcePluginOptionsEditorProps<JsonApiDataSourceOptions> {}

export const ConfigEditor: React.FC<Props> = ({ options, onOptionsChange }) => {
  const onUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({ ...options, url: e.currentTarget.value });
  };
  const onParamsChange = (e: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({ ...options, jsonData: { ...options.jsonData, queryParams: e.currentTarget.value } });
  };
  return (
    <>
      <Legend>HTTP</Legend>
      <div className="gf-form-group">
        <div className="gf-form">
          <InlineFormLabel tooltip={<p>URL to an endpoint that returns a JSON response.</p>}>URL</InlineFormLabel>
          <Input className="width-25" value={options.url} onChange={onUrlChange} placeholder="page=1&limit=100" />
        </div>
        <div className="gf-form">
          <InlineFormLabel tooltip={<p>Add custom query parameters to your query.</p>}>
            Query parameters
          </InlineFormLabel>
          <Input
            className="width-25"
            value={options.jsonData.queryParams}
            onChange={onParamsChange}
            placeholder="page=1&limit=100"
          />
        </div>
      </div>
    </>
  );
};
