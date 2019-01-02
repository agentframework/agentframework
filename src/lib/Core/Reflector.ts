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
  return AgentFramework.Reflector(target);
}
