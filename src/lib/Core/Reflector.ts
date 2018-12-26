import { Type } from './Reflection/Type';
import { AgentFramework } from './AgentFramework';

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

  if (!target) {
    throw new TypeError(`Reflection target is null`);
  }

  let ctor;
  if ('function' === typeof target) {
    ctor = target;
  } else if ('object' === typeof target) {
    // if a object hasOwnPropertyDescriptor('constructor') then this object is a prototype
    const constructor = Object.getOwnPropertyDescriptor(target, 'constructor');
    if (constructor && 'function' === typeof constructor.value) {
      return AgentFramework.Reflector(target);
    } else {
      // this object is not a prototype, so we find it's constructor
      ctor = target.constructor;
    }
  } else {
    // number, boolean
    throw new TypeError(`Reflection target type is not supported`);
  }

  let proto;
  if (AgentFramework.Constructors.has(ctor)) {
    proto = AgentFramework.Constructors.get(ctor)!.prototype;
  } else {
    proto = ctor.prototype;
  }
  return AgentFramework.Reflector(proto);
}
