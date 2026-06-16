import { TypeaheadInput, TypeaheadOutput } from '@grafana/ui';
import { jp } from './jsonpath';

/**
 * onSuggest returns suggestions for the current JSON Path and cursor position.
 *
 * Normally you'd have to parse the query language here. This function
 * simplifies this by instead using JSON Path for getting the actual values.
 *
 * The onData provides the source data used when generating the suggestions.
 * This makes it easier to test the suggestions logic.
 */
export const onSuggest = async (input: TypeaheadInput, onData: () => Promise<any>): Promise<TypeaheadOutput> => {
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

  // Suggest operators inside brackets.
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

  // Get the actual JSON for parsing.
  const response = await onData();

  const values = jp({ path, json: response });

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
};
