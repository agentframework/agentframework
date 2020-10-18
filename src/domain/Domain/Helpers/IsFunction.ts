/**
 * Return true if value is function
 */
export function IsFunction(value: any): value is Function {
  return 'function' === typeof value;
}
