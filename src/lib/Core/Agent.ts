import { Constructor } from './Constructor';
import { AgentAttribute } from './AgentAttribute';
import { Resolve } from './Resolver/Resolve';
import { CanDecorate } from '../Compiler/Internal/Utils';
import { CreateAgentInvocation } from '../Compiler/CreateAgentInvocation';

/**
 * Ascent a class with @decorators into agent (add support for Interceptor and Initializer)
 */
export function Agent<U extends T, T>(target: Constructor<T>, agentAttribute?: AgentAttribute): Constructor<U> {
  // the attributes to initialize agent constructor
  // current only support only one initializer, multiple interceptors
  if (!agentAttribute) {
    agentAttribute = Resolve(AgentAttribute);
  }
  if (!CanDecorate(agentAttribute, target)) {
    throw new TypeError('Unable to decorate ' + agentAttribute.constructor.name + ' on type: ' + target.name);
  }
  // const invocation = CreateAgentInvocation(target, agentAttribute);
  return CreateAgentInvocation(target, agentAttribute).invoke(arguments);
}
