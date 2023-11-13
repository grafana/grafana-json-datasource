import { FieldType, SelectableValue } from '@grafana/data';
import { Button, InlineField, InlineFieldRow, Input, Select } from '@grafana/ui';
import React from 'react';
import { JsonField, QueryLanguage } from 'types';
import { JsonataQueryField } from './JsonataQueryField';
import { JsonPathQueryField } from './JsonPathQueryField';

interface Props {
  limit?: number;
  onChange: (value: JsonField[]) => void;
  onComplete: () => Promise<any>;
  value: JsonField[];
}

export const FieldEditor = ({ value = [], onChange, limit, onComplete }: Props) => {
  const onChangePath = (i: number) => (e: string) => {
    onChange(value.map((field, n) => (i === n ? { ...value[i], jsonPath: e } : field)));
  };
  const onLanguageChange = (i: number) => (e: SelectableValue<QueryLanguage>) => {
    onChange(value.map((field, n) => (i === n ? { ...value[i], language: e.value } : field)));
  };
  const onChangeType = (i: number) => (e: SelectableValue<string>) => {
    onChange(
      value.map((field, n) =>
        i === n ? { ...value[i], type: (e.value === 'auto' ? undefined : e.value) as FieldType } : field
      )
    );
  };
  const onAliasChange = (i: number) => (e: any) => {
    onChange(value.map((field, n) => (i === n ? { ...value[i], name: e.currentTarget.value } : field)));
  };

  const addField = (i: number, defaults?: { language: QueryLanguage }) => () => {
    if (!limit || value.length < limit) {
      onChange([...value.slice(0, i + 1), { name: '', jsonPath: '', ...defaults }, ...value.slice(i + 1)]);
    }
  };
  const removeField = (i: number) => () => {
    onChange([...value.slice(0, i), ...value.slice(i + 1)]);
  };

  return (
    <>
      {value.map((field, index) => (
        <InlineFieldRow key={index}>
          <InlineField
            label="Field"
            tooltip={
              <div>
                A <a href="https://goessner.net/articles/JsonPath/">JSON Path</a> query that selects one or more values
                from a JSON object.
              </div>
            }
            grow
          >
            {field.language === 'jsonata' ? (
              <JsonataQueryField onBlur={() => onChange(value)} onChange={onChangePath(index)} query={field.jsonPath} />
            ) : (
              <JsonPathQueryField
                onBlur={() => onChange(value)}
                onChange={onChangePath(index)}
                query={field.jsonPath}
                onData={onComplete}
              />
            )}
          </InlineField>
          <InlineField>
            <Select
              value={field.language ?? 'jsonpath'}
              width={14}
              onChange={onLanguageChange(index)}
              options={[
                { label: 'JSONPath', value: 'jsonpath' },
                { label: 'JSONata', value: 'jsonata' },
              ]}
            />
          </InlineField>
          <InlineField label="Type" tooltip="If Auto is set, the JSON property type is used to detect the field type.">
            <Select
              value={field.type ?? 'auto'}
              width={12}
              onChange={onChangeType(index)}
              options={[
                { label: 'Auto', value: 'auto' },
                { label: 'String', value: 'string' },
                { label: 'Number', value: 'number' },
                { label: 'Time', value: 'time' },
                { label: 'Boolean', value: 'boolean' },
              ]}
            />
          </InlineField>
          <InlineField label="Alias" tooltip="If left blank, the field uses the name of the queried element.">
            <Input width={12} value={field.name} onChange={onAliasChange(index)} />
          </InlineField>

          {(!limit || value.length < limit) && (
            <Button
              variant="secondary"
              onClick={addField(index, { language: field.language ?? 'jsonpath' })}
              title="plus"
              icon="plus"
            />
          )}

          {value.length > 1 ? (
            <Button variant="secondary" onClick={removeField(index)} icon="minus" title="minus" />
          ) : null}
        </InlineFieldRow>
      ))}
    </>
  );
};
