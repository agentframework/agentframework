import { IInvocation } from '../Core/IInvocation';
import { InitializerInvocation } from './Invocation/InitializerInvocation';
import { InterceptorInvocation } from './Invocation/InterceptorInvocation';
import { AgentAttribute } from '../Core/AgentAttribute';
import { AgentInvocation } from './Invocation/AgentInvocation';
import { IAttribute } from '../Core/IAttribute';

/**
 * Build Agent using AgentAttribute
 */
export function CreateAgentInvocation(target: Function, agentAttribute: AgentAttribute): IInvocation {
  // chain the pipeline
  // custom interceptors -> agent interceptor -> agent initializer -> agent invocation
  let invocation: IInvocation = new AgentInvocation(target, agentAttribute);

  // as normal attribute
  const attribute: IAttribute = agentAttribute;

  // add agent initializer into pipeline
  if (typeof attribute.getInitializer === 'function') {
    invocation = new InitializerInvocation(invocation, attribute.getInitializer());
  }

  // add agent interceptor into pipeline
  if (typeof attribute.getInterceptor === 'function') {
    invocation = new InterceptorInvocation(invocation, attribute.getInterceptor());
  }

  return invocation;
}
