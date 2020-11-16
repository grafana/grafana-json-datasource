import { detectFieldType } from './DataSource';

test('years and months gets parsed as string to reduce false positives', () => {
  expect(detectFieldType(['2005', '2006'])).toEqual(['string', ['2005', '2006']]);
  expect(detectFieldType(['2005-01', '2006-01'])).toEqual(['string', ['2005-01', '2006-01']]);
});

test('iso8601 gets parsed as time', () => {
  expect(detectFieldType(['2005-01-02', '2006-01-02'])).toEqual(['time', [1104620400000, 1136156400000]]);
  expect(detectFieldType(['2006-01-02T15:06:13Z', '2006-01-02T15:07:13Z'])).toEqual([
    'time',
    [1136214373000, 1136214433000],
  ]);
});
