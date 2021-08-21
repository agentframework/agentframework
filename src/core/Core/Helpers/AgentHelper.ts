import { Agents, Types } from '../Knowledge';
/**
 * @internal
 */
export function RememberAgent(agent: Function, type: Function) {
  Agents.v1.set(agent, type);
  Agents.v1.set(agent.prototype, type.prototype);
}

/**
 * Return true if giving type is an agent
 */
export function IsAgent<T extends Function>(test: Function | object): test is T {
  return Agents.v1.has(test);
}

/**
 * Find original type of the agent (if have)
 */
export function GetAgentType<T extends Function | object>(type: T): T | undefined {
  return <T | undefined>Agents.v1.get(type);
}

/**
 * @internal
 */
export function RememberType(target: Function, receiver: Function): void {
  Types.v1.set(target, receiver);
  Types.v1.set(target.prototype, receiver.prototype);
}

/**
 * Find real type
 */
export function GetType<T extends Function | object>(type: T): T | undefined {
  return <T | undefined>Types.v1.get(type);
}






























