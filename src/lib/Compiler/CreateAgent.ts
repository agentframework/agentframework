import { CanDecorate } from './Internal/Utils';
import { AgentAttribute } from '../Core/AgentAttribute';
import { CreateAgentInvocation } from './CreateAgentInvocation';

export function CreateAgent<T extends P, P extends Function>(target: P, agentAttribute?: AgentAttribute): T {
  // the attributes to initialize agent constructor
  // current only support only one initializer, multiple interceptors
  if (!agentAttribute) {
    agentAttribute = new AgentAttribute();
  }
  if (!CanDecorate(agentAttribute, target)) {
    throw new TypeError('Unable to decorate ' + agentAttribute.constructor.name + ' on type: ' + target.name);
  }
  // const invocation = CreateAgentInvocation(target, agentAttribute);
  return CreateAgentInvocation(target, agentAttribute).invoke(arguments);
}
