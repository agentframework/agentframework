import { Constructor } from './constructor';
import { Reflection } from './reflection';
import { Reflections } from './reflections';
import { IsFunction, IsObject } from './utils';


/**
 * Reflector is the interface to access type data from class or instance
 * @param {Object | Constructor} target Instance, Prototype or Constructor
 * @returns {Reflection}
 * @constructor
 */
export function Reflector(target: Object | Constructor): Reflection {
  
  if (new.target) {
    throw new SyntaxError(`Not allow calling new Reflector`);
  }
  
  // NOTE: in AgentFramework 1.0, the reflection data can only set on Type.
  // in AgentFramework 2.0. the reflection data will able to set on instance.
  if (!target) {
    throw new TypeError();
  }
  
  const type = typeof target;
  let prototype;
  
  if (type === 'function') {
    prototype = (<Function>target).prototype;
  }
  else if (type === 'object') {
    
    const constructor = Object.getOwnPropertyDescriptor(target, 'constructor');
    if (constructor && IsFunction(constructor.value)) {
      // this is a prototype already
      prototype = target.constructor.prototype;
    }
    else {
      prototype = Object.getPrototypeOf(target);
    }
  }
  else {
    // number, boolean
    throw new TypeError();
  }
  
  if (!IsObject(prototype)) {
    throw new TypeError(`Unable to create reflection for object without prototype`);
  }
  
  if (!Reflections.has(prototype)) {
    Reflections.set(prototype, new Reflection(prototype));
  }
  
  return Reflections.get(prototype);
}
