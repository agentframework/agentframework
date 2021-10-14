/**
 * @internal
 */
export function alter<T extends object>(target: T, key: string | symbol | number, value: object): T {
  Reflect.defineProperty(target, key, value);
  return target;
}
