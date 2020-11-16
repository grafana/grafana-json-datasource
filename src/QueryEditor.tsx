import defaults from 'lodash/defaults';
import React, { ChangeEvent } from 'react';
import { Icon, InlineFormLabel, Segment } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './DataSource';
import { JsonApiDataSourceOptions, JsonApiQuery, defaultQuery } from './types';
import { JsonPathQueryField } from './JsonPathQueryField';
import { cx } from 'emotion';

type Props = QueryEditorProps<DataSource, JsonApiQuery, JsonApiDataSourceOptions>;

export const QueryEditor: React.FC<Props> = ({ onRunQuery, onChange, query }) => {
  const { fields } = defaults(query, defaultQuery);

  const onFieldNameChange = (i: number) => (event: ChangeEvent<HTMLInputElement>) => {
    fields[i] = { ...fields[i], name: event.target.value };
    onChange({ ...query, fields });
    onRunQuery();
  };

  const onChangePath = (i: number) => (e: string) => {
    fields[i] = { ...fields[i], jsonPath: e };
    onChange({ ...query, fields });
  };

  const addField = (i: number) => () => {
    if (fields) {
      fields.splice(i + 1, 0, { name: '', jsonPath: '' });
    }
    onChange({ ...query, fields });
  };

  const removeField = (i: number) => () => {
    if (fields) {
      fields.splice(i, 1);
    }
    onChange({ ...query, fields });
    onRunQuery();
  };

  return (
    <>
      <div className="gf-form-inline">
        <InlineFormLabel
          width={7}
          className="query-keyword"
          tooltip="Time in seconds that the response will be cached in Grafana after receiving it."
        >
          Cache Time
        </InlineFormLabel>
        <Segment
          value={{ label: formatCacheTimeLabel(query.cacheDurationSeconds), value: query.cacheDurationSeconds }}
          options={[0, 5, 10, 30, 60, 60 * 2, 60 * 5, 60 * 10, 60 * 30, 3600, 3600 * 2, 3600 * 5].map(value => ({
            label: formatCacheTimeLabel(value),
            value,
            description: value ? '' : 'Response is not cached at all',
          }))}
          onChange={({ value }) => onChange({ ...query, cacheDurationSeconds: value! })}
        />
        <div className="gf-form gf-form--grow">
          <div className="gf-form-label gf-form-label--grow" />
        </div>
      </div>
      <div className="gf-form">
        <InlineFormLabel
          width={12}
          className="query-keyword"
          tooltip="Add custom parameters to your queries. Any parameters you add here overrides the custom parameters that have been configured by the data source."
        >
          Custom query parameters
        </InlineFormLabel>
        <input
          className="gf-form-input"
          placeholder="page=1&limit=100"
          value={query.queryParams}
          onChange={e => onChange({ ...query, queryParams: e.currentTarget.value })}
        ></input>
      </div>
      {fields
        ? fields.map((field, index) => (
            <div key={index} className="gf-form">
              <InlineFormLabel
                width={7}
                className="query-keyword"
                tooltip={
                  <div>
                    A <a href="https://goessner.net/articles/JsonPath/">JSON Path</a> query that selects one or more
                    values from a JSON object.
                  </div>
                }
              >
                Query
              </InlineFormLabel>
              <JsonPathQueryField onBlur={onRunQuery} onChange={onChangePath(index)} query={field.jsonPath} />
              <InlineFormLabel width={3} className="query-keyword">
                Alias
              </InlineFormLabel>
              <input
                className="gf-form-input width-14"
                value={field.name || ''}
                onChange={onFieldNameChange(index)}
              ></input>

              <a className={cx('gf-form-label', 'gf-form-label--grow')} onClick={addField(index)}>
                <Icon name="plus" />
              </a>
              {fields.length > 1 ? (
                <a className={cx('gf-form-label', 'gf-form-label--grow')} onClick={removeField(index)}>
                  <Icon name="minus" />
                </a>
              ) : null}
            </div>
          ))
        : null}
    </>
  );
};

const defaultCacheDuration = 300;

export const formatCacheTimeLabel = (s: number = defaultCacheDuration) => {
  if (s < 60) {
    return s + 's';
  } else if (s < 3600) {
    return s / 60 + 'm';
  }

  return s / 3600 + 'h';
};
