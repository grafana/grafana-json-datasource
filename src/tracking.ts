import { CoreApp, DataQueryRequest } from '@grafana/data';
import { reportInteraction } from '@grafana/runtime';
import { JsonApiQuery } from 'types';

export const trackRequest = (request: DataQueryRequest<JsonApiQuery>) => {
  if (request.app === CoreApp.Dashboard || request.app === CoreApp.PanelViewer) {
    return;
  }

  request.targets.forEach((target) => {
    reportInteraction('grafana_json_query_executed', {
      app: request.app,
      cacheDurationSeconds: target.cacheDurationSeconds,
      method: target.method,
    });
  });
};
