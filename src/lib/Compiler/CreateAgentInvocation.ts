import { InitializerInvocation } from './Invocation/InitializerInvocation';
import { InterceptorInvocation } from './Invocation/InterceptorInvocation';
import { AgentInvocation } from './Invocation/AgentInvocation';
import { GetInitializer, GetInterceptor } from './Internal/Utils';
import { IInvocation } from '../Core/IInvocation';
import { Agents } from '../Core/Cache';
import { AgentAttribute } from '../Core/AgentAttribute';

/**
 * Build Agent using AgentAttribute
 */
export function CreateAgentInvocation<T>(target: Function, attribute: AgentAttribute): T {
  // chain the pipeline
  // custom interceptors -> agent interceptor -> agent initializer -> agent invocation
  let invocation: IInvocation = new AgentInvocation(target);

  // add agent initializer into pipeline
  const initializer = GetInitializer(attribute);
  if (initializer) {
    invocation = new InitializerInvocation(invocation, initializer);
  }

  // add agent interceptor into pipeline
  const interceptor = GetInterceptor(attribute);
  if (interceptor) {
    invocation = new InterceptorInvocation(invocation, interceptor);
  }

  const newTarget = invocation.invoke<T>(arguments);
  Agents.set(newTarget, target);
  return newTarget;
}
