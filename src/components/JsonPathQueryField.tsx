import React from 'react';

import { QueryField, SlatePrism, BracesPlugin, TypeaheadInput } from '@grafana/ui';
import { onSuggest } from 'suggestions';

interface Props {
  query: string;
  onBlur: () => void;
  onChange: (v: string) => void;
  suggestions: boolean;
  onData: () => Promise<any>;
}

/**
 * JsonPathQueryField is an editor for JSON Path.
 */
export const JsonPathQueryField: React.FC<Props> = ({ query, onBlur, onChange, suggestions, onData }) => {
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

  // This is important if you don't want punctuation to interfere with your suggestions.
  const cleanText = (s: string) => s.replace(/[{}[\]="(),!~+\-*/^%\|\$@\.]/g, '').trim();

  const onTypeahead = (input: TypeaheadInput) => onSuggest(input, onData);

  return (
    <QueryField
      additionalPlugins={plugins}
      query={query}
      cleanText={cleanText}
      onTypeahead={suggestions ? onTypeahead : undefined}
      onRunQuery={onBlur}
      onChange={onChange}
      portalOrigin="jsonapi"
      placeholder="$.items[*].name"
    />
  );
};
