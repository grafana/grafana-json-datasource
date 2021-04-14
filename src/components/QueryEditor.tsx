import defaults from 'lodash/defaults';
import React, { useState } from 'react';
import { InlineFieldRow, InlineField, Segment, RadioButtonGroup, CodeEditor, useTheme, InfoBox } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { JsonApiQuery, JsonApiDataSourceOptions, defaultQuery } from '../types';
import { KeyValueEditor } from './KeyValueEditor';
import AutoSizer from 'react-virtualized-auto-sizer';
import { css } from 'emotion';
import { Pair } from '../types';
import { JsonDataSource } from 'datasource';
import { FieldEditor } from './FieldEditor';
import { PathEditor } from './PathEditor';

// Display a warning message when user adds any of the following headers.
const sensitiveHeaders = ['authorization', 'proxy-authorization', 'x-api-key'];

interface Props extends QueryEditorProps<JsonDataSource, JsonApiQuery, JsonApiDataSourceOptions> {
  limitFields?: number;
}

export const QueryEditor: React.FC<Props> = ({ onRunQuery, onChange, limitFields, datasource, range, ...props }) => {
  const [bodyType, setBodyType] = useState('plaintext');
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();

  const query = defaults(props.query, defaultQuery);

  // const onMethodChange = (method: string) => {
  //   onChange({ ...query, method });
  //   onRunQuery();
  // };

  const onBodyChange = (body: string) => {
    onChange({ ...query, body });
    onRunQuery();
  };

  const onParamsChange = (params: Array<Pair<string, string>>) => {
    onChange({ ...query, params });
    onRunQuery();
  };

  const onHeadersChange = (headers: Array<Pair<string, string>>) => {
    onChange({ ...query, headers });
    onRunQuery();
  };

  const tabs = [
    {
      title: 'Fields',
      content: query.fields && (
        <FieldEditor
          value={query.fields}
          onChange={(value) => {
            onChange({ ...query, fields: value });
            onRunQuery();
          }}
          limit={limitFields}
          onComplete={() => datasource.metadataRequest(query, range)}
        />
      ),
    },
    {
      title: 'Path',
      content: (
        <PathEditor
          method={query.method ?? 'GET'}
          onMethodChange={(method) => {
            onChange({ ...query, method });
            onRunQuery();
          }}
          path={query.urlPath ?? ''}
          onPathChange={(path) => {
            onChange({ ...query, urlPath: path });
            onRunQuery();
          }}
        />
      ),
    },
    {
      title: 'Params',
      content: (
        <KeyValueEditor
          addRowLabel={'Add param'}
          columns={['Key', 'Value']}
          values={query.params ?? []}
          onChange={onParamsChange}
          onBlur={() => onRunQuery()}
        />
      ),
    },
    {
      title: 'Headers',
      content: (
        <KeyValueEditor
          addRowLabel={'Add header'}
          columns={['Key', 'Value']}
          values={query.headers ?? []}
          onChange={onHeadersChange}
          onBlur={() => onRunQuery()}
        />
      ),
    },
    {
      title: 'Body',
      content: (
        <>
          <InlineFieldRow>
            <InlineField label="Syntax highlighting">
              <RadioButtonGroup
                value={bodyType}
                onChange={(v) => setBodyType(v ?? 'plaintext')}
                options={[
                  { label: 'Text', value: 'plaintext' },
                  { label: 'JSON', value: 'json' },
                  { label: 'XML', value: 'xml' },
                ]}
              />
            </InlineField>
          </InlineFieldRow>
          <InlineFieldRow>
            <AutoSizer
              disableHeight
              className={css`
                margin-bottom: ${theme.spacing.sm};
              `}
            >
              {({ width }) => (
                <CodeEditor
                  value={query.body || ''}
                  language={bodyType}
                  width={width}
                  height="200px"
                  showMiniMap={false}
                  showLineNumbers={true}
                  onBlur={onBodyChange}
                />
              )}
            </AutoSizer>
          </InlineFieldRow>
        </>
      ),
    },
  ];

  return (
    <>
      <InlineFieldRow>
        <InlineField>
          <RadioButtonGroup
            onChange={(e) => setTabIndex(e ?? 0)}
            value={tabIndex}
            options={tabs.map((tab, idx) => ({ label: tab.title, value: idx }))}
          />
        </InlineField>
        <InlineField
          label="Cache Time"
          tooltip="Time in seconds that the response will be cached in Grafana after receiving it."
        >
          <Segment
            value={{ label: formatCacheTimeLabel(query.cacheDurationSeconds), value: query.cacheDurationSeconds }}
            options={[0, 5, 10, 30, 60, 60 * 2, 60 * 5, 60 * 10, 60 * 30, 3600, 3600 * 2, 3600 * 5].map((value) => ({
              label: formatCacheTimeLabel(value),
              value,
              description: value ? '' : 'Response is not cached at all',
            }))}
            onChange={({ value }) => onChange({ ...query, cacheDurationSeconds: value! })}
          />
        </InlineField>
      </InlineFieldRow>
      {query.method === 'GET' && query.body && (
        <InfoBox severity="warning">
          {"GET requests can't have a body. The body you've defined will be ignored."}
        </InfoBox>
      )}
      {(query.headers ?? []).map(([key, _]) => key.toLowerCase()).find((_) => sensitiveHeaders.includes(_)) && (
        <InfoBox severity="warning">
          {
            "It looks like you're adding credentials in the header. Since queries are stored unencrypted, it's strongly recommended that you add any secrets to the data source config instead."
          }
        </InfoBox>
      )}
      {tabs[tabIndex].content}
    </>
  );
};

export const formatCacheTimeLabel = (s: number) => {
  if (s < 60) {
    return s + 's';
  } else if (s < 3600) {
    return s / 60 + 'm';
  }

  return s / 3600 + 'h';
};
