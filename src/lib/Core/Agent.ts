import { Constructor } from './Constructor';
import { AgentAttribute } from './AgentAttribute';
import { Resolve } from './Resolver/Resolve';
import { CanDecorate } from '../Compiler/Internal/Utils';
import { CreateAgentInvocation } from '../Compiler/CreateAgentInvocation';

/**
 * Ascent a class with @decorators into agent (add support for Interceptor and Initializer)
 */
export function Agent<T>(target: Constructor<T>, agentAttribute?: AgentAttribute): Constructor<T> {
  // the attributes to initialize agent constructor
  // current only support only one initializer, multiple interceptors
  if (!agentAttribute) {
    agentAttribute = Resolve(AgentAttribute);
  }
  if (CanDecorate(agentAttribute, target)) {
    return CreateAgentInvocation(target, agentAttribute).invoke(arguments);
  }
  return target;
}
