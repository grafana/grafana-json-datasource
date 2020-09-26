import React, { ChangeEvent } from 'react';

import { LegacyForms, DataSourceHttpSettings } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { JsonApiDataSourceOptions } from './types';

import {} from '@emotion/core';

const { Input, FormField } = LegacyForms;

interface Props extends DataSourcePluginOptionsEditorProps<JsonApiDataSourceOptions> {}

/**
 * ConfigEditor lets the user configure connection details like the URL or
 * authentication.
 */
export const ConfigEditor: React.FC<Props> = ({ options, onOptionsChange }) => {
  const onParamsChange = (e: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...options.jsonData,
        queryParams: e.currentTarget.value,
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
      <div className="gf-form-group">
        <div className="gf-form-inline">
          <div className="gf-form max-width-30">
            <FormField
              label="Custom query parameters"
              labelWidth={14}
              tooltip="Add custom parameters to your queries."
              inputEl={
                <Input
                  className="width-25"
                  value={options.jsonData.queryParams}
                  onChange={onParamsChange}
                  spellCheck={false}
                  placeholder="page=1&limit=100"
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
