import { GrafanaTheme2 } from '@grafana/data';
import { Button, Icon, useStyles2, useTheme2 } from '@grafana/ui';
import { css } from '@emotion/css';
import React from 'react';
import { Pair } from '../types';

interface Props {
  columns: string[];
  values: Array<Pair<string, string>>;
  addRowLabel: string;

  onChange: (rows: Array<Pair<string, string>>) => void;
  onBlur: () => void;
}

export const KeyValueEditor = ({ columns, values, onChange, addRowLabel, onBlur }: Props) => {
  const styles = useStyles2(getStyles);
  const theme = useTheme2();

  const updateCell = (colIdx: number, rowIdx: number, value: string) => {
    onChange(
      values.map(([key, val], idx) => {
        if (rowIdx === idx) {
          if (colIdx === 0) {
            return [value, val];
          } else if (colIdx === 1) {
            return [key, value];
          } else {
            return [key, val];
          }
        }
        return [key, val];
      })
    );
  };

  const addRow = (i: number) => {
    onChange([...values.slice(0, i + 1), ['', ''], ...values.slice(i + 1)]);
  };

  const removeRow = (i: number) => {
    onChange([...values.slice(0, i), ...values.slice(i + 1)]);
  };

  return values.length === 0 ? (
    <Button
      variant="secondary"
      onClick={() => {
        addRow(0);
      }}
    >
      {addRowLabel}
    </Button>
  ) : (
    <table className={styles.root}>
      <thead className={styles.thead}>
        <tr className={styles.row}>
          {columns.map((_, key) => (
            <th key={key} className={styles.th}>
              {_}
            </th>
          ))}
          <th className={styles.th}></th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {values.map((row, rowIdx) => (
          <tr key={rowIdx} className={styles.row}>
            {row.map((cell, colIdx) => (
              <td key={colIdx} className={styles.td}>
                <input
                  value={cell}
                  onChange={(e) => updateCell(colIdx, rowIdx, e.currentTarget.value)}
                  onBlur={onBlur}
                  className={styles.input}
                />
              </td>
            ))}
            <td className={styles.td}>
              <div
                className={css`
                  display: flex;
                  & > * {
                    margin-right: ${theme.spacing(0.5)};
                  }
                  & > *:last-child {
                    margin-right: 0;
                  }
                `}
              >
                <a
                  className={css`
                    display: flex;
                    background: ${theme.colors.background.secondary};
                    padding: ${theme.spacing(0.5, 1)};
                    align-items: center;
                    border-radius: ${theme.shape.radius.default};
                  `}
                  onClick={() => addRow(rowIdx)}
                >
                  <Icon name="plus" />
                </a>
                <a
                  className={css`
                    display: flex;
                    background: ${theme.colors.background.secondary};
                    padding: ${theme.spacing(0.5, 1)};
                    align-items: center;
                    border-radius: ${theme.shape.radius.default};
                  `}
                  onClick={() => removeRow(rowIdx)}
                >
                  <Icon name="minus" />
                </a>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const getStyles = (theme: GrafanaTheme2) => {
  return {
    root: css`
      table-layout: auto;
      border: 1px solid ${theme.colors.border.medium};
      border-collapse: separate;
      border-radius: ${theme.shape.radius.default};
      border-spacing: 0;
      border-left: 0;
      width: 100%;
    `,
    thead: css`
      display: table-header-group;
      vertical-align: middle;
      border-color: inherit;
      border-collapse: separate;

      &:first-child tr:first-child th:first-child {
        border-radius: ${theme.shape.radius.default} 0 0 0;
      }
      &:last-child tr:last-child th:first-child {
        border-radius: 0 0 0 ${theme.shape.radius.default};
      }
    `,
    tbody: css`
      &:first-child tr:first-child td:first-child {
        border-radius: ${theme.shape.radius.default} 0 0 0;
      }

      &:last-child tr:last-child td:first-child {
        border-radius: 0 0 0 ${theme.shape.radius.default};
      }
    `,
    input: css`
      outline: none;
      border: 0;
      background: transparent;
      width: 100%;
    `,
    row: css`
      display: table-row;
      vertical-align: inherit;
      border-color: inherit;
    `,
    th: css`
      padding: ${theme.spacing(0.5, 1)};
      border-left: solid ${theme.colors.border.medium} 1px;
      font-size: ${theme.typography.bodySmall.fontSize};
      color: ${theme.colors.text.secondary};
      font-weight: ${theme.typography.fontWeightRegular};

      &:last-child {
        border-left: 0;
      }
    `,
    td: css`
      padding: ${theme.spacing(0.5, 1)};
      border: 1px solid transparent;
      border-left: solid ${theme.colors.border.medium} 1px;
      border-top: solid ${theme.colors.border.medium} 1px;
      background-color: ${theme.colors.background.primary};
      &:last-child {
        border-left: 0;
        width: 32px;
        padding-left: 0;
        padding-right: ${theme.spacing(0.5)};
      }
    `,
  };
};
