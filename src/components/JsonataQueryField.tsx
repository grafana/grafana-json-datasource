import { BracesPlugin, QueryField, SlatePrism } from '@grafana/ui';
import React from 'react';

interface Props {
  query: string;
  onBlur: () => void;
  onChange: (v: string) => void;
}

/**
 * JsonataQueryField is an editor for JSONata expressions.
 */
export const JsonataQueryField: React.FC<Props> = ({ query, onBlur, onChange }) => {
  /**
   * The QueryField supports Slate plugins, so let's add a few useful ones.
   */
  const plugins = [
    BracesPlugin(),
    SlatePrism({
      onlyIn: (node: any) => node.type === 'code_block',
      getSyntax: () => 'js',
    }),
  ];

  return (
    <QueryField
      additionalPlugins={plugins}
      query={query}
      onRunQuery={onBlur}
      onChange={onChange}
      portalOrigin="jsonapi"
      placeholder="$sum(orders.(price*quantity))"
    />
  );
};
