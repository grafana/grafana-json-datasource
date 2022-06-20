import { InlineField, InlineFieldRow, Select } from '@grafana/ui';
import { JSONPath } from 'jsonpath-plus';
import React from 'react';
import { JsonApiQuery } from 'types';

interface Props {
  query: JsonApiQuery;
  onChange: (query: JsonApiQuery) => void;
  onRunQuery: () => void;
  editorContext: string;
}

export const OptionsEditor = ({ query, onChange, onRunQuery, editorContext }: Props) => {
  // Group by
  //keep experimental value for backwards compatibility
  const groupByField = query.groupByField || query?.experimentalGroupByField;

  const onGroupByChange = (field?: string) => {
    onChange({ ...query, groupByField: field });
    onRunQuery();
  };

  // TODO: Extract field names from the actual result.
  const fieldNames = query.fields
    .map((field) => {
      if (field.language === 'jsonpath') {
        if (field.name) {
          return field.name;
        }

        const pathArray = (JSONPath as any).toPathArray(field.jsonPath);
        return pathArray[pathArray.length - 1];
      }

      return field.name;
    })
    .filter((name) => name)
    .map((path) => ({ label: path, value: path }));

  return (
    <>
      {editorContext === 'default' && (
        <>
          <InlineFieldRow>
            <InlineField
              labelWidth={12}
              label="Group by"
              tooltip={
                <>
                  <p>
                    {
                      'Groups the query result into multiple results. This can be useful when you want to graph multiple time series in the same panel.'
                    }
                  </p>
                  <a
                    href="https://github.com/marcusolsson/grafana-json-datasource/issues/36"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Share feedback
                  </a>
                </>
              }
            >
              <Select
                placeholder={'Field'}
                width={20}
                isClearable={true}
                value={fieldNames.find((v) => v.value === groupByField)}
                options={fieldNames}
                onChange={(value) => onGroupByChange(value?.value)}
              />
            </InlineField>
          </InlineFieldRow>
        </>
      )}
    </>
  );
};
