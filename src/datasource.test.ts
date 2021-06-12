import { dateTime, TimeRange } from '@grafana/data';
import { replaceMacros } from './datasource';

const sampleTimestampFrom = '2021-05-17T20:48:09.000Z'; // -> 1621284489
const sampleTimestmapTo = '2021-05-17T20:50:23.000Z'; // -> 1621284623

const range: TimeRange = {
  from: dateTime(sampleTimestampFrom),
  to: dateTime(sampleTimestmapTo),
  raw: {
    from: sampleTimestampFrom,
    to: sampleTimestmapTo,
  },
};

test('range gets converted into ISO8601 notation', () => {
  expect(replaceMacros('$__isoFrom()', range)).toStrictEqual(sampleTimestampFrom);
  expect(replaceMacros('$__isoTo()', range)).toStrictEqual(sampleTimestmapTo);
});

test('range gets converted into unix epoch notation', () => {
  expect(replaceMacros('$__unixEpochFrom()', range)).toStrictEqual('1621284489');
  expect(replaceMacros('$__unixEpochTo()', range)).toStrictEqual('1621284623');
});
