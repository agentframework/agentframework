import { Constructor } from '../Compiler/Constructor';

const GetWeakMap = new Function('k', 'return k=Symbol.for(k),this[k]||(this[k]=new WeakMap())');

export const Agents: WeakMap<any, any> = GetWeakMap('AgentFramework.Agents');
export const Types: WeakMap<any, any> = GetWeakMap('AgentFramework.Types');

export function IsAgent<T>(agent: Constructor<T>): boolean {
  return Agents.has(agent);
}

export function GetType<T>(agent: Constructor<T>): Constructor<T> | undefined {
  return Agents.get(agent);
}
