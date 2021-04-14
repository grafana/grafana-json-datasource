import { InfoBox } from '@grafana/ui';
import React from 'react';
import { InlineFieldRow, InlineField, Select } from '@grafana/ui';
import { JsonApiQuery } from 'types';
import { JSONPath } from 'jsonpath-plus';

interface Props {
  query: JsonApiQuery;
  onChange: (query: JsonApiQuery) => void;
  onRunQuery: () => void;
}

export const ExperimentalEditor = ({ query, onChange, onRunQuery }: Props) => {
  const { groupByField } = query;

  const onGroupByChange = (field?: string) => {
    onChange({ ...query, groupByField: field });
    onRunQuery();
  };

  const fieldNames = query.fields
    .map((field) => {
      const pathArray = (JSONPath as any).toPathArray(field.jsonPath);
      return pathArray[pathArray.length - 1];
    })
    .map((path) => ({ label: path, value: path }));

  return (
    <>
      <InfoBox severity="warning">
        {`The features listed here are experimental. They might change or be removed without notice. In the tooltip for each feature, there's a link to a pull request where you can submit feedback for that feature.`}
      </InfoBox>
      <InlineFieldRow>
        <InlineField
          label="Group by"
          tooltip={
            <>
              <p>
                {
                  'Groups the query result into multiple results. This can be useful when you want to graph multiple time series in the same panel.'
                }
              </p>
              <a href="https://github.com/marcusolsson/grafana-json-datasource">Submit feedback</a>
            </>
          }
        >
          <Select
            placeholder={'Field'}
            width={12}
            isClearable={true}
            value={fieldNames.find((v) => v.value === groupByField)}
            options={fieldNames}
            onChange={(value) => onGroupByChange(value?.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};
