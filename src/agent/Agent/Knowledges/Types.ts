import { Remember } from '../../../decorator/Decorator/Remember/Remember';

/**
 * Get original type of giving type
 */
export class Types {
  // core
  // key: agent | class, value: class
  static get v1() {
    return Remember('Types', this, 'v1', () => new WeakMap<Function | object, Function | object>());
  }
}

/**
 * @internal
 */
export function RememberType(base: Function, receiver: Function): void {
  Types.v1.set(base, receiver);
  Types.v1.set(base.prototype, receiver.prototype);
}

/**
 * Find real
 */
export function GetType<T extends Function | object>(type: T): T | undefined {
  return <T | undefined>Types.v1.get(type);
}
