import {} from '@emotion/core';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { DataSourceHttpSettings, InlineField, InlineFieldRow, Input, RadioButtonGroup } from '@grafana/ui';
import React, { ChangeEvent } from 'react';
import { JsonApiDataSourceOptions } from '../types';

type Props = DataSourcePluginOptionsEditorProps<JsonApiDataSourceOptions>;

/**
 * ConfigEditor lets the user configure connection details like the URL or
 * authentication.
 */
export const ConfigEditor: React.FC<Props> = ({ options, onOptionsChange }) => {
  let isBodyHidden = options.jsonData.method === 'POST' ? false : true;
  const onParamQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...options.jsonData,
        queryParams: e.currentTarget.value,
      },
    });
  };

  const onParamMethodChange = (e: string) => {
    isBodyHidden = options.jsonData.method === 'POST' ? false : true;
    onOptionsChange({
      ...options,
      jsonData: {
        ...options.jsonData,
        method: e ?? 'GET',
      },
    });
  };

  const onParamBodyChange = (e: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...options.jsonData,
        body: e.currentTarget.value,
      },
    });
  };

  return (
    <>
      {/* DataSourceHttpSettings handles most the settings for connecting over
      HTTP. */}
      <DataSourceHttpSettings
        defaultUrl="http://localhost:8080"
        dataSourceConfig={options}
        onChange={onOptionsChange}
      />

      {/* The Grafana proxy strips query parameters from the URL set in
      DataSourceHttpSettings. To support custom query parameters, the user need
      to set them explicitly.  */}
      <h3 className="page-heading">Misc</h3>
      <InlineFieldRow>
        <InlineField label="Method" tooltip="Choose which http method to use." labelWidth={24}>
          <RadioButtonGroup
            value={options.jsonData.method}
            onChange={onParamMethodChange}
            options={[
              { label: 'GET', value: 'GET' },
              { label: 'POST', value: 'POST' },
            ]}
          />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow hidden={isBodyHidden}>
        <InlineField label="Body" tooltip="Add a body for the request" labelWidth={24}>
          <Input
            width={50}
            value={options.jsonData.body}
            onChange={onParamBodyChange}
            spellCheck={false}
            placeholder="{}"
          />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField label="Query string" tooltip="Add a custom query string to your queries." labelWidth={24}>
          <Input
            width={50}
            value={options.jsonData.queryParams}
            onChange={onParamQueryChange}
            spellCheck={false}
            placeholder="page=1&limit=100"
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};
