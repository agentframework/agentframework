import { Constructor } from './Constructor';
import { Type } from './Reflection/Type';

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

function GetAgents(): WeakMap<Function, Function> {
  let value = Reflect.get(root, AgentKey);
  if (!value) {
    // create metadata store only if the global symbol not exits
    value = new WeakMap<Function, Function>();
    Reflect.set(root, AgentKey, value);
  }
  return value;
}

export const Agents = GetAgents();
export const Instances = GetInstances();

export function Resolve<T>(type: Constructor<T>, params?: ArrayLike<any>): T {
  let found = Instances.get(type);
  if (found === undefined) {
    found = <T>Reflect.construct(type, params || []);
    Instances.set(type, found);
  }
  return found;
}

export function ResolveType(prototype: Object): Type {
  let found = Instances.get(prototype);
  if (!found) {
    found = new Type(prototype);
    Instances.set(prototype, found);
  }
  return found;
}
