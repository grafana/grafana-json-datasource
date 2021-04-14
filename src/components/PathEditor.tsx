import React from 'react';
import { InlineFieldRow, InlineField, Input, Select } from '@grafana/ui';
import {} from '@emotion/core';

interface Props {
  method: string;
  onMethodChange: (method: string) => void;
  path: string;
  onPathChange: (path: string) => void;
}

export const PathEditor = ({ method, onMethodChange, path, onPathChange }: Props) => {
  return (
    <InlineFieldRow>
      <InlineField>
        <Select
          value={method}
          options={[
            { label: 'GET', value: 'GET' },
            { label: 'POST', value: 'POST' },
          ]}
          onChange={(v) => onMethodChange(v.value ?? 'GET')}
        />
      </InlineField>
      <InlineField grow>
        <Input placeholder="/orders/${orderId}" value={path} onChange={(e) => onPathChange(e.currentTarget.value)} />
      </InlineField>
    </InlineFieldRow>
  );
};
