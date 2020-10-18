/**
 * Return true if value is function
 */
export function IsPromise<T>(value: any): value is Promise<T> {
  return 'object' === typeof value && !!value && value instanceof Promise;
}
