declare var global: any;
declare var window: any;
const root = typeof global === 'object' ? global : window;

// check if the global object has this symbolbb
// add it if it does not have the symbol, yet
// ------------------------------------------
const typesKey = Symbol.for('AgentFramework.Types');
const singletonKey = Symbol.for('AgentFramework.Singletons');

export function GetTypes(): WeakMap<Object, any> {
  let value = Reflect.get(root, typesKey);
  if (!value) {
    // create metadata store only if the global symbol not exits
    value = new WeakMap<Object, any>();
    Reflect.set(root, typesKey, value);
  }
  return value;
}

export function GetSingletons(): WeakMap<Function, any> {
  let value = Reflect.get(root, singletonKey);
  if (!value) {
    // create metadata store only if the global symbol not exits
    value = new WeakMap<Function, any>();
    Reflect.set(root, singletonKey, value);
  }
  return value;
}
