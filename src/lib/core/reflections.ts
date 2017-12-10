import { Reflection } from './reflection';
import { REFLECTION_KEY } from './symbol';

// check if the global object has this symbol
// add it if it does not have the symbol, yet
// ------------------------------------------
if (!Reflect.has(global, REFLECTION_KEY)) {
  // create metadata store only if the global symbol not exits
  Reflect.set(global, REFLECTION_KEY, new WeakMap<object, Reflection>()); // Object.freeze(kernel); - this will break istanbul test
}

export const Reflections: WeakMap<object, Reflection> = Reflect.get(global, REFLECTION_KEY);
