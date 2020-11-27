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
  async get(params?: string) {
    const data: Record<string, string> = {};

    this.params.forEach((key, value) => {
      data[key] = value;
    });

    new URLSearchParams('?' + params).forEach((value, key) => {
      data[key] = value;
    });

    const response = await this._request(data);

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

    return this._request(data);
  }

  /**
   * Returns a cached API response if it exists, otherwise queries the API.
   */
  async cachedGet(cacheDurationSeconds: number, params: string) {
    if (cacheDurationSeconds === 0) {
      return await this.get(params);
    }

    const force = this.lastCacheDuration !== cacheDurationSeconds;

    if (force) {
      this.cache.del(this.baseUrl);
    }

    const cachedItem = this.cache.get(this.baseUrl);
    if (cachedItem && !force) {
      return Promise.resolve(cachedItem);
    }
    this.lastCacheDuration = cacheDurationSeconds;

    const result = await this.get(params);

    this.cache.put(this.baseUrl, result, Math.max(cacheDurationSeconds * 1000, 1));

    return result;
  }

  async _request(data?: Record<string, string>) {
    const req = {
      url: `${this.baseUrl}`,
      method: 'GET',
    };

    console.log(data);

    if (data && Object.keys(data).length > 0) {
      req.url =
        req.url +
        (req.url.search(/\?/) >= 0 ? '&' : '?') +
        Object.entries(data)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
          .join('&');
    }

    console.log(req.url);

    return getBackendSrv().datasourceRequest(req);
  }
}
