import { AgentAttribute, IInterceptor, IInterceptorAttribute, IInvocation } from '../../../src/lib';

export class AgentTrackerAttribute extends AgentAttribute implements IInterceptorAttribute, IInterceptor {
  get interceptor(): IInterceptor {
    return this;
  }

  intercept(target: IInvocation, parameters: ArrayLike<any>): any {
    return target.invoke(parameters);
  }
}
