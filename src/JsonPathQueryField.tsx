import React from 'react';

import { QueryField } from '@grafana/ui';

interface Props {
  query: string;
  onBlur: () => void;
  onChange: (v: string) => void;
}

export const JsonPathQueryField: React.FC<Props> = ({ query, onBlur, onChange }) => {
  return (
    <div style={{ marginRight: '4px', width: '100%' }}>
      <QueryField
        query={query}
        onBlur={onBlur}
        onChange={onChange}
        portalOrigin="jsonapi"
        placeholder="$.items[*].name"
      />
    </div>
  );
};
