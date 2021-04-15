import { InfoBox } from '@grafana/ui';
import React from 'react';
import { InlineFieldRow, InlineField, Select } from '@grafana/ui';
import { JsonApiQuery } from 'types';
import { JSONPath } from 'jsonpath-plus';

interface Props {
  query: JsonApiQuery;
  onChange: (query: JsonApiQuery) => void;
  onRunQuery: () => void;
  editorContext: string;
}

export const ExperimentalEditor = ({ query, onChange, onRunQuery, editorContext }: Props) => {
  // Group by
  const { groupByField } = query;

  const onGroupByChange = (field?: string) => {
    onChange({ ...query, groupByField: field });
    onRunQuery();
  };

  // Metric
  const { metricField } = query;

  const onMetricChange = (field?: string) => {
    onChange({ ...query, metricField: field });
    onRunQuery();
  };

  // Variable label
  const { variableTextField } = query;

  const onVariableLabelChange = (field?: string) => {
    onChange({ ...query, variableTextField: field });
    onRunQuery();
  };

  // Variable value
  const { variableValueField } = query;

  const onVariableValueChange = (field?: string) => {
    onChange({ ...query, variableValueField: field });
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
      {editorContext === 'default' && (
        <>
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
                width={12}
                isClearable={true}
                value={fieldNames.find((v) => v.value === groupByField)}
                options={fieldNames}
                onChange={(value) => onGroupByChange(value?.value)}
              />
            </InlineField>
          </InlineFieldRow>
          <InlineFieldRow>
            <InlineField
              label="Metric"
              tooltip={
                <>
                  <p>{'Set the display name of the selected field to the name of the query result.'}</p>
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
                width={12}
                isClearable={true}
                value={fieldNames.find((v) => v.value === metricField)}
                options={fieldNames}
                onChange={(value) => onMetricChange(value?.value)}
              />
            </InlineField>
          </InlineFieldRow>
        </>
      )}
      {editorContext === 'variables' && (
        <>
          <InlineFieldRow>
            <InlineField
              label="Variable text"
              tooltip={
                <>
                  <p>{'Field to use for the text label of a variable query.'}</p>
                  <a
                    href="https://github.com/marcusolsson/grafana-json-datasource/issues/79"
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
                width={12}
                isClearable={true}
                value={fieldNames.find((v) => v.value === variableTextField)}
                options={fieldNames}
                onChange={(value) => onVariableLabelChange(value?.value)}
              />
            </InlineField>
          </InlineFieldRow>
          <InlineFieldRow>
            <InlineField
              label="Variable value"
              tooltip={
                <>
                  <p>{'Field to use for the value of a variable query.'}</p>
                  <a
                    href="https://github.com/marcusolsson/grafana-json-datasource/issues/79"
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
                width={12}
                isClearable={true}
                value={fieldNames.find((v) => v.value === variableValueField)}
                options={fieldNames}
                onChange={(value) => onVariableValueChange(value?.value)}
              />
            </InlineField>
          </InlineFieldRow>
        </>
      )}
    </>
  );
};
