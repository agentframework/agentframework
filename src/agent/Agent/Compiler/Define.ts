/**
 * @internal
 */
export function Define<T extends object>(
  target: T,
  key: string | symbol | number,
  options: { get?: any; set?: any; value?: any },
): T {
  Reflect.defineProperty(target, key, options);
  return target;
}
