/**
 * @internal
 */
export function DefineGetter<T>(target: object | Function, key: string | symbol | number, get: () => T) {
  Reflect.defineProperty(target, key, { get });
}
