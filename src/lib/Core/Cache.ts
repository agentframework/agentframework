declare var global: any;
declare var window: any;
const root = typeof global === 'object' ? global : window;

// check if the global object has this symbolbb
// add it if it does not have the symbol, yet
// ------------------------------------------
const TypesKey = Symbol.for('AgentFramework.Types');
const SingletonKey = Symbol.for('AgentFramework.Singletons');
const ConstructorKey = Symbol.for('AgentFramework.Constructors');

export function GetTypes(): WeakMap<Object, any> {
  let value = Reflect.get(root, TypesKey);
  if (!value) {
    // create metadata store only if the global symbol not exits
    value = new WeakMap<Object, any>();
    Reflect.set(root, TypesKey, value);
  }
  return value;
}

export function GetSingletons(): WeakMap<Function, any> {
  let value = Reflect.get(root, SingletonKey);
  if (!value) {
    // create metadata store only if the global symbol not exits
    value = new WeakMap<Function, any>();
    Reflect.set(root, SingletonKey, value);
  }
  return value;
}

export function GetConstructors(): WeakMap<Function, Function> {
  let value = Reflect.get(root, ConstructorKey);
  if (!value) {
    // create metadata store only if the global symbol not exits
    value = new WeakMap<Function, Function>();
    Reflect.set(root, ConstructorKey, value);
  }
  return value;
}
