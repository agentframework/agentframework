import { Type } from './Type';
import { ResolveType } from '../Internal/ResolveType';
import { Agents } from '../Internal/Cache';

/**
 * Reflector is the interface to access type data from class or class instance or class prototype
 */
export function Reflector(target: Function | Object): Type {
  if (new.target) {
    // NOTE: in AgentFramework 1.0, the reflection data can only set on Class.
    // At present, we didn't found any use case to access reflection data on instance.
    // We will added the support if got enough requirements.
    throw new SyntaxError(`Not allow calling new Reflector`);
  }

  let ctor;
  if ('function' === typeof target) {
    ctor = target;
  } else if ('object' === typeof target) {
    // if a object hasOwnPropertyDescriptor('constructor') then this object is a prototype
    const constructor = Object.getOwnPropertyDescriptor(target, 'constructor');
    if (constructor && 'function' === typeof constructor.value) {
      return ResolveType(target);
    } else {
      // this object is not a prototype, so we find it's constructor
      ctor = target.constructor;
    }
  } else {
    // number, boolean
    throw new TypeError(`Reflection target type is not supported`);
  }

  let proto;
  // make sure get the prototype of origin type
  if (Agents.has(ctor)) {
    proto = Agents.get(ctor)!.prototype;
  } else {
    proto = ctor.prototype;
  }

  return ResolveType(proto);
}
