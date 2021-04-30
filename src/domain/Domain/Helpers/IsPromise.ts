/**
 * Return true if value is function
 */
export function IsPromise<T>(value: any): value is Promise<T> {
  if (value instanceof Promise) {
    return true;
  }
  return false;
}
