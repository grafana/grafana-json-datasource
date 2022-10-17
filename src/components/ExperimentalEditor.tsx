import { InfoBox, InlineField, InlineFieldRow, Select } from '@grafana/ui';
import { JSONPath } from 'jsonpath-plus';
import React from 'react';
import { JsonApiQuery } from 'types';

interface Props {
  query: JsonApiQuery;
  onChange: (query: JsonApiQuery) => void;
  onRunQuery: () => void;
  editorContext: string;
}

export const ExperimentalEditor = ({ query, onChange, onRunQuery, editorContext }: Props) => {
  // Group by
  const { experimentalGroupByField: groupByField } = query;

  const onGroupByChange = (field?: string) => {
    onChange({ ...query, experimentalGroupByField: field });
    onRunQuery();
  };

  // Metric
  const { experimentalMetricField: metricField } = query;

  const onMetricChange = (field?: string) => {
    onChange({ ...query, experimentalMetricField: field });
    onRunQuery();
  };

  // Variable label
  const { experimentalVariableTextField: variableTextField } = query;

  const onVariableLabelChange = (field?: string) => {
    onChange({ ...query, experimentalVariableTextField: field });
    onRunQuery();
  };

  // Variable value
  const { experimentalVariableValueField: variableValueField } = query;

  const onVariableValueChange = (field?: string) => {
    onChange({ ...query, experimentalVariableValueField: field });
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
      <InfoBox severity="warning" style={{ maxWidth: '700px', whiteSpace: 'normal' }}>
        <p>
          {`The features listed here are experimental. They might change or be removed without notice. In the tooltip for
          each feature, there's a link to a pull request where you can submit feedback for that feature.`}
        </p>
      </InfoBox>
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
                    href="https://github.com/grafana/grafana-json-datasource/issues/36"
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
          <InlineFieldRow>
            <InlineField
              labelWidth={12}
              label="Metric"
              tooltip={
                <>
                  <p>{'Set the display name of the selected field to the name of the query result.'}</p>
                  <a
                    href="https://github.com/grafana/grafana-json-datasource/issues/36"
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
              labelWidth={15}
              label="Variable text"
              tooltip={
                <>
                  <p>{'Field to use for the text label of a variable query.'}</p>
                  <a
                    href="https://github.com/grafana/grafana-json-datasource/issues/79"
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
                value={fieldNames.find((v) => v.value === variableTextField)}
                options={fieldNames}
                onChange={(value) => onVariableLabelChange(value?.value)}
              />
            </InlineField>
          </InlineFieldRow>
          <InlineFieldRow>
            <InlineField
              labelWidth={15}
              label="Variable value"
              tooltip={
                <>
                  <p>{'Field to use for the value of a variable query.'}</p>
                  <a
                    href="https://github.com/grafana/grafana-json-datasource/issues/79"
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
