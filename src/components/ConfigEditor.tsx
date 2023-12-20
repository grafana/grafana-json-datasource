import { DataSourcePluginOptionsEditorProps, GrafanaTheme2 } from '@grafana/data';
import { Field, Input, useStyles2 } from '@grafana/ui';
import React, { ChangeEvent } from 'react';
import { JsonApiDataSourceOptions } from '../types';
import {
  AdvancedHttpSettings,
  Auth,
  ConfigSection,
  ConnectionSettings,
  DataSourceDescription,
  convertLegacyAuthProps,
} from '@grafana/experimental';
import { css } from '@emotion/css';
import { Divider } from './Divider';

type Props = DataSourcePluginOptionsEditorProps<JsonApiDataSourceOptions>;

/**
 * ConfigEditor lets the user configure connection details like the URL or
 * authentication.
 */
export const ConfigEditor: React.FC<Props> = ({ options, onOptionsChange }) => {
  const styles = useStyles2(getStyles);

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
      <DataSourceDescription
        dataSourceName="JSON API"
        docsLink="https://grafana.com/docs/plugins/marcusolsson-json-datasource/latest/"
        hasRequiredFields={false}
      />

      <Divider />

      <ConnectionSettings config={options} onChange={onOptionsChange} urlPlaceholder="http://localhost:8080" />

      <Divider />

      <Auth
        {...convertLegacyAuthProps({
          config: options,
          onChange: onOptionsChange,
        })}
      />

      <Divider />

      <ConfigSection title="Additional settings" isCollapsible>
        <AdvancedHttpSettings config={options} onChange={onOptionsChange} />

        <div className={styles.space} />

        <Field label="Query string" description="Add a custom query string to your queries.">
          <Input
            width={40}
            value={options.jsonData.queryParams}
            onChange={onParamsChange}
            spellCheck={false}
            placeholder="limit=100"
          />
        </Field>
      </ConfigSection>
    </>
  );
};

const getStyles = (theme: GrafanaTheme2) => {
  return {
    space: css({
      width: '100%',
      height: theme.spacing(2),
    }),
  };
};
