import defaults from 'lodash/defaults';

import React, { useState } from 'react';
import { JsonApiVariableQuery, defaultVariableQuery } from '../types';
import { InlineFormLabel } from '@grafana/ui';
import { JsonPathQueryField } from './JsonPathQueryField';

interface VariableQueryProps {
  query: JsonApiVariableQuery;
  onChange: (query: JsonApiVariableQuery, definition: string) => void;
}

export const VariableQueryEditor: React.FC<VariableQueryProps> = ({ onChange, query }) => {
  const init = defaults(query, defaultVariableQuery);

  const [state, setState] = useState<JsonApiVariableQuery>(init);

  const saveQuery = () => {
    onChange(state, state.jsonPath);
  };

  const onChangePath = (jsonPath: string) => setState({ ...state, jsonPath });
  const onQueryParams = (queryParams: string) => setState({ ...state, queryParams });

  return (
    <>
      <div className="gf-form">
        <InlineFormLabel
          width={12}
          tooltip="Add custom parameters to your queries. Any parameters you add here overrides the custom parameters that have been configured by the data source."
        >
          Custom query parameters
        </InlineFormLabel>
        <input
          className="gf-form-input"
          placeholder="page=1&limit=100"
          value={state.queryParams}
          onChange={e => onQueryParams(e.currentTarget.value)}
          onBlur={saveQuery}
        ></input>
      </div>
      <div className="gf-form">
        <InlineFormLabel
          width={10}
          tooltip={
            <div>
              A <a href="https://goessner.net/articles/JsonPath/">JSON Path</a> query that selects one or more values
              from a JSON object.
            </div>
          }
        >
          Query
        </InlineFormLabel>
        <JsonPathQueryField onBlur={saveQuery} onChange={onChangePath} query={state.jsonPath} />
      </div>
    </>
  );
};
