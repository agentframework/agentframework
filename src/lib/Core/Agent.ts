import { Constructor } from './Constructor';
import { AgentAttribute } from './AgentAttribute';
import { Resolve } from './Resolver/Resolve';
import { CanDecorate } from '../Compiler/Internal/Utils';
import { CreateAgentInvocation } from '../Compiler/CreateAgentInvocation';

/**
 * Ascent a class with @decorators into agent (add support for Interceptor and Initializer)
 */
export function Agent<T>(target: Constructor<T>, options?: AgentAttribute): Constructor<T> {
  // the attributes to initialize agent constructor
  // current only support only one initializer, multiple interceptors
  if (!options) {
    options = Resolve(AgentAttribute);
  }
  if (CanDecorate(options, target)) {
    return CreateAgentInvocation(target, options);
  }
  return target;
}
