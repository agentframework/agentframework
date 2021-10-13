import { Remember } from "../../Core/Decorators/Remember";

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
