/**
 * @internal
 */
export function set(target: object, key: string | symbol | number, value: any): void {
  Reflect.defineProperty(target, key, value);
}
