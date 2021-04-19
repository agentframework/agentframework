/**
 * Return true if value is function
 */
export function IsPromise<T>(value: any): value is Promise<T> {
  if (value && (value instanceof Promise || (value.then && value.catch))) {
    return true;
  }
  return false;
}
