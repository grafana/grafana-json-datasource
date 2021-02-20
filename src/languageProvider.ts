import { TimeRange } from '@grafana/data';
import { TypeaheadInput, TypeaheadOutput } from '@grafana/ui';
import { JSONPath } from 'jsonpath-plus';

import { JsonApiQuery } from 'types';
import { JsonDataSource } from 'datasource';

/**
 * JsonPathLanguageProvider provides suggestions for the QueryField onTypeahead
 * callback.
 */
export class JsonPathLanguageProvider {
  datasource: JsonDataSource;

  constructor(datasource: JsonDataSource) {
    this.datasource = datasource;
  }

  // This is important if you don't want punctuation to interfere with your suggestions.
  cleanText = (s: string) => s.replace(/[{}[\]="(),!~+\-*/^%\|\$@\.]/g, '').trim();

  /**
   * getSuggestions returns completion items for the current JSON Path and
   * cursor position.
   *
   * In addition to the typeahead input, this method accepts the current query
   * and time range as a context for the actual data source request.
   *
   * Since the language provider has a reference to the data source instance,
   * we can invoke methods that aren't part of the DataSourceApi interface. In this case, we call a `metadataRequest`
   * method to query the data source on-demand.
   *
   * Normally you'd have to parse the query language here. This function
   * simplifies this by instead using JSON Path for getting the actual values.
   */
  async getSuggestions(input: TypeaheadInput, context: JsonApiQuery, timeRange?: TimeRange): Promise<TypeaheadOutput> {
    const { value } = input;

    const emptyResult: TypeaheadOutput = { suggestions: [] };

    if (!value) {
      return emptyResult;
    }

    const selectedLines = value.document.getTextsAtRange(value.selection);
    const currentLine = selectedLines.size === 1 ? selectedLines.first().getText() : null;

    if (!currentLine) {
      return emptyResult;
    }

    const toCursor = currentLine.slice(0, value.selection.anchor.offset);

    // $.dat|
    const currIdentifier = /[a-zA-Z0-9]$/;

    // $.data.|
    const nextIdentifier = /[\$\]a-zA-Z0-9]\.$/;

    // $.data[|
    const enterBrackets = /\[$/;

    // $.data[?(@.|
    const currentNodeIdentifier = /@\.$/;

    // Here we check whether the cursor is in a position where it should
    // suggest.
    const shouldSuggest =
      currIdentifier.test(toCursor) ||
      nextIdentifier.test(toCursor) ||
      currentNodeIdentifier.test(toCursor) ||
      enterBrackets.test(toCursor);

    if (!shouldSuggest) {
      return emptyResult;
    }

    // Get the actual JSON for parsing.
    const response = await this.datasource.metadataRequest(context, timeRange);

    if (enterBrackets.test(toCursor)) {
      return {
        suggestions: [
          {
            label: 'Operators',
            items: [
              { label: '*', documentation: 'Returns all elements.' },
              { label: ':', documentation: 'Returns a slice of the array.' },
              {
                label: '?',
                insertText: '?()',
                move: -1,
                documentation: 'Returns elements based on a filter expression.',
              },
            ],
          },
        ],
      };
    }

    const insideBrackets = toCursor.lastIndexOf('[') > toCursor.lastIndexOf(']');

    // Construct a JSON Path that returns the items in the current context.
    const path = insideBrackets
      ? toCursor.slice(0, toCursor.lastIndexOf('[') + 1) + ':]'
      : currentLine.slice(0, currentLine.lastIndexOf('.'));

    const values = JSONPath({ path, json: response });

    // Don't attempt to suggest if this is a leaf node, e.g. strings, numbers, and booleans.
    if (typeof values[0] !== 'object') {
      return emptyResult;
    }

    return {
      suggestions: [
        {
          label: 'Elements', // Name of the suggestion group
          items: Object.entries(values[0]).map(([key, value]) => {
            return Array.isArray(value)
              ? {
                  label: key, // Text to display in the suggestion list
                  insertText: key + '[]', // When selecting an array, we automatically insert the brackets ...
                  move: -1, // ... and put the cursor between them
                  documentation: `_array (${value.length})_`, // Markdown documentation for the suggestion
                }
              : {
                  label: key,
                  documentation: `_${typeof value}_\n\n**Preview:**\n\n\`${value}\``,
                };
          }),
        },
      ],
    };
  }
}
