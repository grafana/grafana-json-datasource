import React from 'react';

import { QueryField, SlatePrism, BracesPlugin } from '@grafana/ui';

interface Props {
  query: string;
  onBlur: () => void;
  onChange: (v: string) => void;
}

/**
 * JsonPathQueryField is an editor for JSON Path.
 */
export const JsonPathQueryField: React.FC<Props> = ({ query, onBlur, onChange }) => {
  const plugins = [
    BracesPlugin(),
    SlatePrism({
      onlyIn: (node: any) => node.type === 'code_block',
      getSyntax: (node: any) => 'js',
    }),
  ];

  return (
    <QueryField
      additionalPlugins={plugins}
      query={query}
      onBlur={onBlur}
      onChange={onChange}
      portalOrigin="jsonapi"
      placeholder="$.items[*].name"
    />
  );
};
