import { Constructor } from './constructor';
import { Reflection } from './reflection';
import { Reflections } from './reflections';
import { IsFunction } from './utils';

/**
 * Reflector is the interface to access type data from class or instance
 * @param {Object | Constructor} target Instance, Prototype or Constructor
 * @returns {Reflection}
 * @constructor
 */
export function Reflector(target: object | Constructor): Reflection {

  if (new.target) {
    // NOTE: in AgentFramework 1.0, the reflection data can only set on Type.
    // At present, we didn't found any use case to access reflection data on instance.
    // We will added the support if got enough requirements.
    throw new SyntaxError(`Not allow calling new Reflector`);
  }

  if (!target) {
    throw new TypeError(`Reflection target is null`);
  }

  const type = typeof target;
  let prototype;

  if (type === 'function') {
    prototype = (target as Function).prototype;
  }
  else if (type === 'object') {

    // do not call Object.getPrototypeOf() if target is a prototype
    // because Object.getPrototypeOf(Object.prototype) will return null
    const constructor = Object.getOwnPropertyDescriptor(target, 'constructor');
    if (constructor && IsFunction(constructor.value)) {
      // this is a prototype already
      prototype = target.constructor.prototype;
    }
    else {
      prototype = target['__proto__'];
    }

  }
  else {
    // number, boolean
    throw new TypeError(`Reflection target type is not supported`);
  }

  if (!Reflections.has(prototype)) {
    Reflections.set(prototype, new Reflection(prototype));
  }

  return Reflections.get(prototype);
}
