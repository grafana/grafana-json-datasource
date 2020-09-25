import { getBackendSrv } from '@grafana/runtime';
import cache from 'memory-cache';

export default class Api {
  cache: any;
  baseUrl: string;
  params: string;
  lastCacheDuration: number | undefined;

  constructor(baseUrl: string, params: string) {
    this.baseUrl = baseUrl;
    this.params = params;
    this.cache = new cache.Cache();
  }

  /**
   * Queries the API and returns the response data.
   */
  async get() {
    const req = {
      url: `${this.baseUrl}${this.params.length ? `?${this.params}` : ''}`,
      method: 'GET',
    };

    const response = await getBackendSrv().datasourceRequest(req);

    return response.data;
  }

  /**
   * Used as a health check.
   */
  async test() {
    const req = {
      url: `${this.baseUrl}${this.params.length ? `?${this.params}` : ''}`,
      method: 'GET',
    };
    return getBackendSrv().datasourceRequest(req);
  }

  /**
   * Returns a cached API response if it exists, otherwise queries the API.
   */
  async cachedGet(cacheDurationSeconds: number, params?: string) {
    if (cacheDurationSeconds === 0) {
      return await this.get();
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

    const result = await this.get();

    this.cache.put(this.baseUrl, result, Math.max(cacheDurationSeconds * 1000, 1));

    return result;
  }
}
