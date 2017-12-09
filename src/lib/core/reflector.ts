import { Reflection } from './reflection';

/**
 * Reflector is the interface to access reflection data from class or instance
 * @param instanceOrType
 * @returns {Reflection} Return a Reflection instance on giving type
 * @constructor
 */
export function Reflector(instanceOrType: Object | Function): Reflection {
  
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
  

  // create or generate
  
  throw new Error('not implemented');
  
}

