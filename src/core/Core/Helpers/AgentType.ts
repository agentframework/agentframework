import { Constructor } from '../Constructor';
import { Types } from '../Knowledge';

export function RememberAgentType<T extends Function>(agent: T, type: T): void {
  Types.v1.set(agent, type);
  Types.v1.set(agent.prototype, type.prototype);
}

/**
 * Find original type of the agent (if have)
 */
export function GetAgentType<T extends object | Function>(type: T): T | undefined {
  return Types.v1.get(type) as T;
}

/**
 * Return true if giving type is an agent
 */
export function IsAgent<T extends Constructor<unknown>>(test: object | Function, type?: T): test is T {
  const found = Types.v1.get(test);
  if (type) {
    return found === type;
  }
  return found ? found !== test : false;
}
