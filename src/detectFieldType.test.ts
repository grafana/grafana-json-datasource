import { detectFieldType } from './datasource';
import { format } from 'date-fns';

test('years and months gets parsed as string to reduce false positives', () => {
  expect(detectFieldType(['2005', '2006'])).toEqual(['string', ['2005', '2006']]);
  expect(detectFieldType(['2005-01', '2006-01'])).toEqual(['string', ['2005-01', '2006-01']]);
});

test('iso8601 date without time zone gets parsed as time', () => {
  const input = ['2005-01-02', '2006-01-02'];
  const res = detectFieldType(input);

  expect(res[0]).toStrictEqual('time');

  // Since the input doesn't have a time zone, the resulting timestamps are in
  // local time. For now, test that we can parse and format it to input values.
  expect(res[1].map(_ => format(_, 'yyyy-MM-dd'))).toStrictEqual(input);
});

test('iso8601 gets parsed as time', () => {
  expect(detectFieldType(['2006-01-02T15:06:13Z', '2006-01-02T15:07:13Z'])).toEqual([
    'time',
    [1136214373000, 1136214433000],
  ]);
});

test('nullable iso8601 gets parsed as time', () => {
  expect(detectFieldType(['2006-01-02T15:06:13Z', null])).toEqual(['time', [1136214373000, null]]);
});

test('all zeros gets parsed as number', () => {
  expect(detectFieldType([0, 0, 0])).toEqual(['number', [0, 0, 0]]);
  expect(detectFieldType([0, 0, 1])).toEqual(['number', [0, 0, 1]]);

  expect(detectFieldType([false, false, false])).toEqual(['boolean', [false, false, false]]);
  expect(detectFieldType([false, false, true])).toEqual(['boolean', [false, false, true]]);
});

test('all false gets parsed as boolean', () => {
  expect(detectFieldType([false, false, false])).toEqual(['boolean', [false, false, false]]);
  expect(detectFieldType([false, false, true])).toEqual(['boolean', [false, false, true]]);
});

test('all null gets parsed as string', () => {
  expect(detectFieldType([null, null])).toEqual(['string', [null, null]]);
});
