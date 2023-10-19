import { dateTime, TimeRange } from '@grafana/data';
import { JsonDataSource, replaceMacros } from './datasource';

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

describe('datasource', () => {
  it('should not allow urls that contains ..', async () => {
    const ds = new JsonDataSource({ url: 'http://localhost:3000', jsonData: {} } as any);

    const response = ds.doRequest({ urlPath: 'http://localhost:3000/..', method: 'GET' } as any);

    expect(response).rejects.toThrowError('URL path contains unsafe characters');
  });

  it('should throw error when method is not POST or GET', async () => {
    const ds = new JsonDataSource({ url: 'http://localhost:3000', jsonData: {} } as any);

    const responsePUT = ds.doRequest({ method: 'PUT' } as any);

    expect(responsePUT).rejects.toThrowError('Invalid method PUT');

    const responsePATCH = ds.doRequest({ method: 'PATCH' } as any);

    expect(responsePATCH).rejects.toThrowError('Invalid method PATCH');

    const responseDELETE = ds.doRequest({ method: 'DELETE' } as any);

    expect(responseDELETE).rejects.toThrowError('Invalid method DELETE');
  });
});
