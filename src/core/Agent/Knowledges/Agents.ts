import { Remember } from '../../Core/Decorators/Remember';

/**
 * Get original type of giving agent
 */
export class Agents {
  // key: agent | agent.prototype, value: class | class.prototype
  static get v1() {
    return Remember('Agents', this, 'v1', () => new WeakMap<Function | object, Function | object>());
  }
}
