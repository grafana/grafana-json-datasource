import defaults from 'lodash/defaults';

import React, { useState } from 'react';
import { JsonApiVariableQuery, defaultVariableQuery } from '../types';
import { InlineField, InlineFieldRow, Input } from '@grafana/ui';
import { JsonPathQueryField } from './JsonPathQueryField';

interface VariableQueryProps {
  query: JsonApiVariableQuery;
  onChange: (query: JsonApiVariableQuery, definition: string) => void;
}

// VariableQueryEditor is used to query values for a dashboard variable.
export const VariableQueryEditor: React.FC<VariableQueryProps> = ({ onChange, query }) => {
  const init = defaults(query, defaultVariableQuery);

  const [state, setState] = useState<JsonApiVariableQuery>(init);

  const saveQuery = () => {
    onChange(state, state.jsonPath);
  };

  const onChangePath = (jsonPath: string) => setState({ ...state, jsonPath });
  const onChangeUrlPath = (urlPath: string) => setState({ ...state, urlPath });
  const onQueryParams = (queryParams: string) => setState({ ...state, queryParams });

  return (
    <>
      <InlineFieldRow>
        <InlineField
          label="Path"
          tooltip="Append a custom path to the data source URL. Should start with a forward slash (/)."
          grow
        >
          <Input
            placeholder="/orders/${orderId}"
            value={query.urlPath}
            onChange={e => onChangeUrlPath(e.currentTarget.value)}
            onBlur={saveQuery}
          />
        </InlineField>
        <InlineField
          label="Query string"
          tooltip="Add custom query parameters to your URL. Any parameters you add here overrides the custom parameters that have been configured by the data source."
          grow
        >
          <Input
            placeholder="page=1&limit=100"
            value={state.queryParams}
            onChange={e => onQueryParams(e.currentTarget.value)}
            onBlur={saveQuery}
          />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField
          label="Query"
          tooltip={
            <div>
              A <a href="https://goessner.net/articles/JsonPath/">JSON Path</a> query that selects one or more values
              from a JSON object.
            </div>
          }
          grow
        >
          <JsonPathQueryField onBlur={saveQuery} onChange={onChangePath} query={state.jsonPath} />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};
