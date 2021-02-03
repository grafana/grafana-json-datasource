import { BackendSrvRequest, getBackendSrv } from '@grafana/runtime';
import cache from 'memory-cache';
import { Observable } from 'rxjs';
import { Pair } from 'types';

export default class Api {
  cache: any;
  baseUrl: string;
  params: URLSearchParams;
  lastCacheDuration: number | undefined;

  constructor(baseUrl: string, params: string) {
    this.baseUrl = baseUrl;
    this.params = new URLSearchParams('?' + params);
    this.cache = new cache.Cache();
  }

  /**
   * Queries the API and returns the response data.
   */
  async get(
    method: string,
    path: string,
    params?: Array<Pair<string, string>>,
    headers?: Array<Pair<string, string>>,
    body?: string
  ) {
    const paramsData: Record<string, string> = {};

    (params ?? []).forEach(([key, value]) => {
      if (key) {
        paramsData[key] = value;
      }
    });

    this.params.forEach((value, key) => {
      paramsData[key] = value;
    });

    const response = await this._request(method, path, paramsData, headers, body);

    return (await response.toPromise()).data;
  }

  /**
   * Used as a health check.
   */
  async test() {
    const data: Record<string, string> = {};

    this.params.forEach((value, key) => {
      data[key] = value;
    });

    return this._request('GET', '', data).toPromise();
  }

  /**
   * Returns a cached API response if it exists, otherwise queries the API.
   */
  async cachedGet(
    cacheDurationSeconds: number,
    method: string,
    path: string,
    params: Array<Pair<string, string>>,
    headers?: Array<Pair<string, string>>,
    body?: string
  ) {
    if (cacheDurationSeconds === 0) {
      return await this.get(method, path, params, headers, body);
    }

    const rawUrl = this.baseUrl + path;

    const force = this.lastCacheDuration !== cacheDurationSeconds;

    if (force) {
      this.cache.del(rawUrl);
    }

    const cachedItem = this.cache.get(rawUrl);
    if (cachedItem && !force) {
      return Promise.resolve(cachedItem);
    }
    this.lastCacheDuration = cacheDurationSeconds;

    const result = await this.get(method, path, params, headers, body);

    this.cache.put(rawUrl, result, Math.max(cacheDurationSeconds * 1000, 1));

    return result;
  }

  /**
   * Make an API request using the data source configuration as defaults.
   * Allows the user to append a path, or override query parameters.
   *
   * @param path to append to URL
   * @param params to set as query parameters
   */
  _request(
    method: string,
    path: string,
    params?: Record<string, string>,
    headers?: Array<Pair<string, string>>,
    data?: string
  ): Observable<any> {
    const recordHeaders: Record<string, any> = {};

    (headers ?? [])
      .filter(([key, _]) => key)
      .forEach(([key, value]) => {
        recordHeaders[key] = value;
      });

    const req: BackendSrvRequest = {
      url: `${this.baseUrl}${path}`,
      method,
      headers: recordHeaders,
    };

    if (req.method !== 'GET' && data) {
      req.data = data;
    }

    // Deduplicate forward slashes, i.e. /// becomes /. This enables sensible
    // defaults for empty variables.
    //
    // For example, `/orgs/${orgId}/list` becomes `/orgs/list` instead of
    // `/orgs//list`.
    req.url = req.url.replace(/[\/]+/g, '/');

    if (params && Object.keys(params).length > 0) {
      req.url =
        req.url +
        (req.url.search(/\?/) >= 0 ? '&' : '?') +
        Object.entries(params)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
          .join('&');
    }

    return getBackendSrv().fetch(req);
  }
}
