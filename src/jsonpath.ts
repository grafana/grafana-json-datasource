import { JSONPath, JSONPathOptions } from 'jsonpath-plus';

export function jp(options: JSONPathOptions): any {
  return JSONPath({
    ...options,
    eval: false,
  });
}
