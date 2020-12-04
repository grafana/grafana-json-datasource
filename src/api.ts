import { getBackendSrv } from '@grafana/runtime';
import cache from 'memory-cache';

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
  async get(path: string, params?: string) {
    const data: Record<string, string> = {};

    this.params.forEach((value, key) => {
      data[key] = value;
    });

    new URLSearchParams('?' + params).forEach((value, key) => {
      data[key] = value;
    });

    const response = await this._request(path, data);

    return response.data;
  }

  /**
   * Used as a health check.
   */
  async test() {
    const data: Record<string, string> = {};

    this.params.forEach((value, key) => {
      data[key] = value;
    });

    return this._request('', data);
  }

  /**
   * Returns a cached API response if it exists, otherwise queries the API.
   */
  async cachedGet(cacheDurationSeconds: number, path: string, params: string) {
    if (cacheDurationSeconds === 0) {
      return await this.get(path, params);
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

    const result = await this.get(path, params);

    this.cache.put(rawUrl, result, Math.max(cacheDurationSeconds * 1000, 1));

    return result;
  }

  /**
   * Make an API request using the data source configuration as defaults.
   * Allows the user to append a path, or override query parameters.
   *
   * @param path to append to URL
   * @param data to set as query parameters
   */
  async _request(path: string, data?: Record<string, string>) {
    const req = {
      url: `${this.baseUrl}${path}`,
      method: 'GET',
    };

    // Deduplicate forward slashes, i.e. /// becomes /. This enables sensible
    // defaults for empty variables.
    //
    // For example, `/orgs/${orgId}/list` becomes `/orgs/list` instead of
    // `/orgs//list`.
    req.url = req.url.replace(/[\/]+/g, '/');

    if (data && Object.keys(data).length > 0) {
      req.url =
        req.url +
        (req.url.search(/\?/) >= 0 ? '&' : '?') +
        Object.entries(data)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
          .join('&');
    }

    return getBackendSrv().datasourceRequest(req);
  }
}
