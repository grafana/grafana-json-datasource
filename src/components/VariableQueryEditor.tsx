import { TimeRange } from '@grafana/data';
import { JsonDataSource } from 'datasource';
import React, { useState } from 'react';
import { JsonApiQuery } from '../types';
import { QueryEditor } from './QueryEditor';

interface VariableQueryProps {
  query: JsonApiQuery;
  onChange: (query: JsonApiQuery, definition: string) => void;
  datasource: JsonDataSource;
  range: TimeRange;
}

// VariableQueryEditor is used to query values for a dashboard variable.
export const VariableQueryEditor: React.FC<VariableQueryProps> = (props) => {
  const { query, onChange } = props;

  // Backwards compatibility with previous query editor for variables.
  const compatQuery = query.jsonPath ? { ...query, fields: [{ jsonPath: query.jsonPath }] } : query;

  const [state, setState] = useState<JsonApiQuery>(compatQuery);

  const saveQuery = () => {
    if (state && state.fields[0].jsonPath) {
      onChange(state, state.fields[0].jsonPath);
    }
  };

  return <QueryEditor {...props} onRunQuery={saveQuery} onChange={setState} query={state} limitFields={1} />;
};
