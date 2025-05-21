/**
 * @internal
 */
export function DefineIfValue<T>(target: object | Function, key: string | symbol | number, value: T): T {
  if ('undefined' !== typeof value) {
    Reflect.defineProperty(target, key, { value });
  }
  return value;
}

