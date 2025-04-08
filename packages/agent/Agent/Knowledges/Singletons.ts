import { Remember } from '../../../../packages/dependencies/core';

/**
 * Global Singleton instance
 */
export class Singletons {
  // key: class, value: singleton instance
  static get v1() {
    return Remember('Singletons', this, 'v1', () => new WeakMap<Function | object, Function | object>());
  }
}
