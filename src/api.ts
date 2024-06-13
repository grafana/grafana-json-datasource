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
  ): Promise<any> {
    const paramsData: Record<string, string> = {};
    // In order to allow for duplicate URL params add a suffix to it to
    // uniquify the key.  We strip this suffix off as part of
    // constructing the final URL in _request()
    let i = 0;
    (params ?? []).forEach(([key, value]) => {
      if (key) {
        paramsData[key + '__' + i] = value;
        i++;
      }
    });

    this.params.forEach((value, key) => {
      paramsData[key] = value;
    });

    const response = this._request(method, path, paramsData, headers, body);

    return (await response.toPromise()).data;
  }

  /**
   * Used as a health check.
   */
  async test(): Promise<any> {
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
  ): Promise<any> {
    if (!cacheDurationSeconds) {
      return await this.get(method, path, params, headers, body);
    }

    let cacheKey = this.baseUrl + path;

    if (params && Object.keys(params).length > 0) {
      cacheKey =
        cacheKey +
        (cacheKey.search(/\?/) >= 0 ? '&' : '?') +
        params.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
    }

    if (this.lastCacheDuration !== cacheDurationSeconds) {
      this.cache.del(cacheKey);
    }
    this.lastCacheDuration = cacheDurationSeconds;

    const cachedItem = this.cache.get(cacheKey);
    if (cachedItem) {
      return Promise.resolve(cachedItem);
    }

    const result = await this.get(method, path, params, headers, body);

    this.cache.put(cacheKey, result, cacheDurationSeconds * 1000);

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
      url: this.baseUrl + path,
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
          .map(([k, v]) => `${encodeURIComponent(k.replace(/__\d+$/, ''))}=${encodeURIComponent(v)}`)
          .join('&');
    }

    // it is important to validate here, directly before the request is sent out,
    // because, for example, template-variables could be used to adjust the final url, etc.
    if (!isSafeURL(req.url)) {
      throw new Error('URL path contains unsafe characters');
    }

    return getBackendSrv().fetch(req);
  }
}

function isSafeURL(origUrl: string) {
  // browsers interpret backslash as slash
  const url = origUrl.replace(/\\/g, '/');
  if (url.endsWith('/..')) {
    return false;
  }

  if (url.includes('/../')) {
    return false;
  }

  if (url.includes('/..?')) {
    return false;
  }

  return true;
}
