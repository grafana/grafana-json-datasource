import { TimeRange } from '@grafana/data';
import { CodeEditor, InfoBox, InlineField, InlineFieldRow, RadioButtonGroup, Segment, useTheme } from '@grafana/ui';
import { JsonDataSource } from 'datasource';
import { css } from 'emotion';
import defaults from 'lodash/defaults';
import React, { useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { defaultQuery, JsonApiQuery, Pair } from '../types';
import { KeyValueEditor } from './KeyValueEditor';
import { PathEditor } from './PathEditor';

// Display a warning message when user adds any of the following headers.
const sensitiveHeaders = ['authorization', 'proxy-authorization', 'x-api-key'];

interface Props {
  onChange: (query: JsonApiQuery) => void;
  onRunQuery: () => void;
  editorContext: string;
  query: JsonApiQuery;
  limitFields?: number;
  datasource: JsonDataSource;
  range?: TimeRange;

  fieldsTab: React.ReactNode;
  experimentalTab: React.ReactNode;
}

export const TabbedQueryEditor = ({ query, onChange, onRunQuery, fieldsTab, experimentalTab }: Props) => {
  const [bodyType, setBodyType] = useState('plaintext');
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();

  const q = defaults(query, defaultQuery);

  const onBodyChange = (body: string) => {
    onChange({ ...q, body });
    onRunQuery();
  };

  const onParamsChange = (params: Array<Pair<string, string>>) => {
    onChange({ ...q, params });
    onRunQuery();
  };

  const onHeadersChange = (headers: Array<Pair<string, string>>) => {
    onChange({ ...q, headers });
    onRunQuery();
  };

  const tabs = [
    {
      title: 'Fields',
      content: fieldsTab,
    },
    {
      title: 'Path',
      content: (
        <PathEditor
          method={q.method ?? 'GET'}
          onMethodChange={(method) => {
            onChange({ ...q, method });
            onRunQuery();
          }}
          path={q.urlPath ?? ''}
          onPathChange={(path) => {
            onChange({ ...q, urlPath: path });
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
          values={q.params ?? []}
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
          values={q.headers ?? []}
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
                  value={q.body || ''}
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
    {
      title: 'Experimental',
      content: experimentalTab,
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
            value={{ label: formatCacheTimeLabel(q.cacheDurationSeconds), value: q.cacheDurationSeconds }}
            options={[0, 5, 10, 30, 60, 60 * 2, 60 * 5, 60 * 10, 60 * 30, 3600, 3600 * 2, 3600 * 5].map((value) => ({
              label: formatCacheTimeLabel(value),
              value,
              description: value ? '' : 'Response is not cached at all',
            }))}
            onChange={({ value }) => onChange({ ...q, cacheDurationSeconds: value! })}
          />
        </InlineField>
      </InlineFieldRow>
      {q.method === 'GET' && q.body && (
        <InfoBox severity="warning" style={{ maxWidth: '700px', whiteSpace: 'normal' }}>
          {"GET requests can't have a body. The body you've defined will be ignored."}
        </InfoBox>
      )}
      {(q.headers ?? []).map(([key, _]) => key.toLowerCase()).find((_) => sensitiveHeaders.includes(_)) && (
        <InfoBox severity="warning" style={{ maxWidth: '700px', whiteSpace: 'normal' }}>
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
