import { DataQueryRequest } from '@grafana/data';
import { reportInteraction } from '@grafana/runtime';
import { JsonApiQuery } from 'types';

export const trackRequest = (request: DataQueryRequest<JsonApiQuery>) => {
  request.targets.forEach((target) => {
    reportInteraction('grafana_json_query_executed', {
      app: request.app,
      cacheDurationSeconds: target.cacheDurationSeconds,
      method: target.method,
    });
  });
};
