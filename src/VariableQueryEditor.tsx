import React, { useState } from 'react';
import { JsonApiVariableQuery } from './types';
import { InlineFormLabel } from '@grafana/ui';
import { JsonPathQueryField } from './JsonPathQueryField';

interface VariableQueryProps {
  query: JsonApiVariableQuery;
  onChange: (query: JsonApiVariableQuery, definition: string) => void;
}

export const VariableQueryEditor: React.FC<VariableQueryProps> = ({ onChange, query }) => {
  const [state, setState] = useState<JsonApiVariableQuery>(query);

  const saveQuery = () => {
    onChange(state, state.jsonPath);
  };

  const onChangePath = (jsonPath: string) => setState({ ...state, jsonPath });

  return (
    <div className="gf-form">
      <InlineFormLabel
        width={10}
        tooltip={
          <p>
            A <a href="https://goessner.net/articles/JsonPath/">JSON Path</a> query that selects one or more values from
            a JSON object.
          </p>
        }
      >
        Query
      </InlineFormLabel>
      <JsonPathQueryField onBlur={saveQuery} onChange={onChangePath} query={state.jsonPath} />
    </div>
  );
};
