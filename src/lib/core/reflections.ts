import { Reflection } from './reflection';
import { REFLECTION_KEY } from './symbol';
declare var global;
declare var window;
const root = typeof global === 'object' ? global : window;

// check if the global object has this symbol
// add it if it does not have the symbol, yet
// ------------------------------------------
if (!Reflect.has(root, REFLECTION_KEY)) {
  // create metadata store only if the global symbol not exits
  Reflect.set(root, REFLECTION_KEY, new WeakMap<object, Reflection>()); // Object.freeze(kernel); - this will break istanbul test
}

export const Reflections: WeakMap<object, Reflection> = Reflect.get(root, REFLECTION_KEY);
