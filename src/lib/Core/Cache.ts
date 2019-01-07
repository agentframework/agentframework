import { Constructor } from './Constructor';

declare var global: any;
declare var window: any;
const root = typeof global === 'object' ? global : window;

// check if the global object has this symbol
// add it if it does not have the symbol, yet
// ------------------------------------------
const InstanceKey = Symbol.for('AgentFramework.Instances');
const AgentKey = Symbol.for('AgentFramework.Agents');

function GetInstances(): WeakMap<any, any> {
  let value = Reflect.get(root, InstanceKey);
  if (!value) {
    // create metadata store only if the global symbol not exits
    value = new WeakMap<any, any>();
    Reflect.set(root, InstanceKey, value);
  }
  return value;
}

function GetAgents(): WeakMap<any, any> {
  let value = Reflect.get(root, AgentKey);
  if (!value) {
    // create metadata store only if the global symbol not exits
    value = new WeakMap<any, any>();
    Reflect.set(root, AgentKey, value);
  }
  return value;
}

export const Agents = GetAgents();

export const Instances = GetInstances();

export function IsAgent<T>(agent: Constructor<T>): boolean {
  return Agents.has(agent);
}

export function GetType<T>(agent: Constructor<T>): Constructor<T> | undefined {
  return Agents.get(agent);
}
