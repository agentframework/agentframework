import { IInvocation } from '../Core/IInvocation';
import { InitializerInvocation } from './Invocation/InitializerInvocation';
import { InterceptorInvocation } from './Invocation/InterceptorInvocation';
import { AgentAttribute } from '../Core/AgentAttribute';
import { AgentInvocation } from './Invocation/AgentInvocation';
import { GetInitializer, GetInterceptor, HasInitializer, HasInterceptor } from './Internal/Utils';

/**
 * Build Agent using AgentAttribute
 */
export function CreateAgentInvocation(target: Function, attribute: AgentAttribute): IInvocation {
  // chain the pipeline
  // custom interceptors -> agent interceptor -> agent initializer -> agent invocation
  let invocation: IInvocation = new AgentInvocation(target, attribute);

  // add agent initializer into pipeline
  if (HasInitializer(attribute)) {
    const initializer = GetInitializer(attribute);
    if (initializer) {
      invocation = new InitializerInvocation(invocation, initializer);
    }
  }

  // add agent interceptor into pipeline
  if (HasInterceptor(attribute)) {
    const interceptor = GetInterceptor(attribute);
    if (interceptor) {
      invocation = new InterceptorInvocation(invocation, interceptor);
    }
  }

  return invocation;
}
