import React from 'react';

import { QueryField, SlatePrism, BracesPlugin, TypeaheadInput, TypeaheadOutput } from '@grafana/ui';
import { JsonDataSource } from 'datasource';
import { JsonApiQuery } from 'types';
import { TimeRange } from '@grafana/data';

interface Props {
  query: string;
  onBlur: () => void;
  onChange: (v: string) => void;
  datasource: JsonDataSource;
  context: JsonApiQuery;
  timeRange?: TimeRange;
  suggestions: boolean;
}

/**
 * JsonPathQueryField is an editor for JSON Path.
 */
export const JsonPathQueryField: React.FC<Props> = ({
  query,
  onBlur,
  onChange,
  datasource,
  context,
  timeRange,
  suggestions,
}) => {
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

  const onTypeahead = async (input: TypeaheadInput): Promise<TypeaheadOutput> => {
    return datasource.languageProvider.getSuggestions(input, context, timeRange);
  };

  return (
    <QueryField
      additionalPlugins={plugins}
      query={query}
      cleanText={datasource.languageProvider.cleanText}
      onTypeahead={suggestions ? onTypeahead : undefined}
      onRunQuery={onBlur}
      onChange={onChange}
      portalOrigin="jsonapi"
      placeholder="$.items[*].name"
    />
  );
};
