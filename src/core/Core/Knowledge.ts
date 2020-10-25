import { memorize } from './Wisdom';
import { Constructor } from './Constructor';
import { Invocation } from './Interfaces/Invocation';

export class Knowledge {
  // core
  // key: Agent Proxy | Agent Constructor | Domain Agent Constructor, value: Original Constructor
  static get types() {
    return memorize<WeakMap<Function | object, Function>>(this, 'types');
  }

  static get invocations() {
    return memorize<WeakMap<Function, Invocation>>(this, 'invocations');
  }
}

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
