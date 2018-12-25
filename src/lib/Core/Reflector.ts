import { Prototype } from './Reflection/Prototype';
import { AgentFramework } from './AgentFramework';

/**
 * Reflector is the interface to access type data from class or instance
 */
export function Reflector(target: Function | Object): Prototype {
  if (new.target) {
    // NOTE: in AgentFramework 1.0, the reflection data can only set on Class.
    // At present, we didn't found any use case to access reflection data on instance.
    // We will added the support if got enough requirements.
    throw new SyntaxError(`Not allow calling new Reflector`);
  }

  if (!target) {
    throw new TypeError(`Reflection target is null`);
  }

  let proto;
  if (typeof target === 'function') {
    proto = target.prototype;
  } else {
    proto = target;
  }

  return AgentFramework.Reflector(proto);
}
