import { Remember } from '../../../decorator/Decorator/Remember/Remember';

/**
 * Get original type of giving agent
 */
export class Agents {
  // key: agent | agent.prototype, value: class | class.prototype
  static get v1() {
    return Remember('Agents', this, 'v1', () => new WeakMap<Function | object, Function | object>());
  }
}

/**
 * Return true if giving type is an agent
 */
export function IsAgent(target: Function | object): boolean {
  return Agents.v1.has(target);
}

/**
 * @internal
 */
export function RememberAgent(base: Function, receiver: Function): void {
  Agents.v1.set(receiver, base);
  Agents.v1.set(receiver.prototype, base.prototype);
}

/**
 * Find original type of the agent. same as IsAgent() && GetType()
 */
export function GetAgentType<T extends Function>(agent: T): T | undefined {
  return <T | undefined>Agents.v1.get(agent);
}
