import { LanguageProvider, TimeRange } from '@grafana/data';
import { CompletionItem, TypeaheadInput, TypeaheadOutput } from '@grafana/ui';
import { JSONPath } from 'jsonpath-plus';

import { JsonApiQuery } from 'types';
import { JsonDataSource } from 'datasource';

export class JsonPathLanguageProvider extends LanguageProvider {
  datasource: JsonDataSource;

  constructor(datasource: JsonDataSource) {
    super();
    this.datasource = datasource;
  }

  cleanText = (s: string) => s.replace(/[{}[\]="(),!~+\-*/^%\|\$@\.]/g, '').trim();

  async provideCompletionItems(
    input: TypeaheadInput,
    context: JsonApiQuery,
    timeRange?: TimeRange
  ): Promise<TypeaheadOutput> {
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

    const currIdentifier = /[a-zA-Z0-9]$/;
    const nextIdentifier = /[\$\]a-zA-Z0-9]\.$/;
    const currentNodeIdentifier = /@\.$/;
    const enterBrackets = /\[$/;

    const isValid =
      currIdentifier.test(toCursor) ||
      nextIdentifier.test(toCursor) ||
      currentNodeIdentifier.test(toCursor) ||
      enterBrackets.test(toCursor);

    if (!isValid) {
      return emptyResult;
    }

    const response: any = await this.datasource.metadataRequest(context, timeRange);

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
                documentation: 'Returns elements based on a filter expression.',
                insertText: '?()',
                move: -1,
              },
            ],
          },
        ],
      };
    }

    const insideBrackets = toCursor.lastIndexOf('[') > toCursor.lastIndexOf(']');

    const path = insideBrackets
      ? toCursor.slice(0, toCursor.lastIndexOf('[') + 1) + ':]'
      : currentLine.slice(0, currentLine.lastIndexOf('.'));

    const values = JSONPath({ path, json: response });

    if (typeof values[0] !== 'object') {
      return emptyResult;
    }

    const items: CompletionItem[] = Object.entries(values[0]).map(([key, value]) => {
      return Array.isArray(value)
        ? { label: key, insertText: key + '[]', move: -1, documentation: `_array (${value.length})_` }
        : { label: key, documentation: `_${typeof value}_\n\n**Preview:**\n\n\`${value}\`` };
    });

    return { suggestions: [{ label: 'Elements', items }] };
  }

  request = async (url: string, params?: any): Promise<any> => {
    return undefined;
  };

  start = async (): Promise<any[]> => {
    return [];
  };
}
