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
  /**
   * The QueryField supports Slate plugins, so let's add a few useful ones.
   */
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
      onRunQuery={onBlur}
      onChange={onChange}
      portalOrigin="jsonapi"
      placeholder="$.items[*].name"
    />
  );
};
