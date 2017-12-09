import { Constructor } from './constructor';
import { Registry, Type } from './type';


/**
 * Reflector is the interface to access type data from class or instance
 * @param {Object | Constructor} instanceOrType
 * @returns {Type}
 * @constructor
 */
export function Reflector(instanceOrType: Object | Constructor): Type {
  
  if (new.target) {
    throw new SyntaxError(`Not allow calling new Reflector`);
  }
  
  // NOTE: in AgentFramework 1.0, the reflection data can only set on Type.
  // in AgentFramework 2.0. the reflection data will able to set on instance.
  if (!instanceOrType) {
    throw new TypeError();
  }
  
  const type = typeof instanceOrType;
  let prototype;
  
  if (type === 'function') {
    prototype = (<Function>instanceOrType).prototype;
  }
  else if (type === 'object') {
    prototype = Object.getPrototypeOf(instanceOrType);
  }
  else {
    // number, boolean
    throw new TypeError();
  }
  
  return Registry.getType(prototype, true);
}
