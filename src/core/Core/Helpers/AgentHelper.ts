import { Agents, Types } from '../Knowledge';
/**
 * @internal
 */
export function RememberAgent(base: Function, receiver: Function): void {
  Agents.v1.set(receiver, base);
  Agents.v1.set(receiver.prototype, base.prototype);
}

/**
 * Return true if giving type is an agent
 */
export function IsAgent(target: Function | object): boolean {
  return Agents.v1.has(target);
}

/**
 * Find original type of the agent (if have)
 */
export function GetAgentType<T extends Function>(agent: T): T | undefined {
  return <T | undefined>Agents.v1.get(agent);
}

/**
 * @internal
 */
export function RememberType(base: Function, receiver: Function): void {
  Types.v1.set(base, receiver);
  Types.v1.set(base.prototype, receiver.prototype);
}

/**
 * Find real type
 */
export function GetType<T extends Function | object>(type: T): T | undefined {
  return <T | undefined>Types.v1.get(type);
}
