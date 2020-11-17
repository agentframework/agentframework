import { Constructor } from './Constructor';
import { Knowledge } from './Annotation/Knowledge';

export function RememberType(agent: Function, type: Function): void {
  Knowledge.types.set(agent, type);
  Knowledge.types.set(agent.prototype, type.prototype);
}

/**
 * Returns original type of the agent
 */
export function GetType<T extends object | Function>(type: T): T | undefined {
  return Knowledge.types.get(type) as T;
}

/**
 * Return true if giving type is an agent
 */
export function IsAgent<T extends Constructor<T>>(test: object | Function): test is Constructor<T> {
  return Knowledge.types.has(test);
}
