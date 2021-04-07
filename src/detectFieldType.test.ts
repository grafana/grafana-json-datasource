import { detectFieldType } from './detectFieldType';

test('years and months gets parsed as string to reduce false positives', () => {
  expect(detectFieldType(['2005', '2006'])).toStrictEqual('string');
  expect(detectFieldType(['2005-01', '2006-01'])).toStrictEqual('string');
});

test('iso8601 date without time zone gets parsed as time', () => {
  expect(detectFieldType(['2005-01-02', '2006-01-02'])).toStrictEqual('time');
});

test('unix epoch in seconds gets parsed as number', () => {
  expect(detectFieldType([1617774880])).toStrictEqual('number');
});

test('unix epoch in milliseconds gets parsed as number', () => {
  expect(detectFieldType([1617774880000])).toStrictEqual('number');
});

test('iso8601 gets parsed as time', () => {
  expect(detectFieldType(['2006-01-02T15:06:13Z', '2006-01-02T15:07:13Z'])).toStrictEqual('time');
});

test('nullable iso8601 gets parsed as time', () => {
  expect(detectFieldType(['2006-01-02T15:06:13Z', null])).toStrictEqual('time');
});

test('floating-point numbers with string length 13 get parsed as number', () => {
  expect(detectFieldType([12.0000000003, 72.0000000001])).toStrictEqual('number');
});

test('all zeros gets parsed as number', () => {
  expect(detectFieldType([0, 0, 0])).toStrictEqual('number');
  expect(detectFieldType([0, 0, 1])).toStrictEqual('number');
});

test('all false gets parsed as boolean', () => {
  expect(detectFieldType([false, false, false])).toStrictEqual('boolean');
  expect(detectFieldType([false, false, true])).toStrictEqual('boolean');
});

test('all null gets parsed as string', () => {
  expect(detectFieldType([null, null])).toStrictEqual('string');
});
