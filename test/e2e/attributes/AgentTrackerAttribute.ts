import { AgentAttribute, IInterceptor, IInterceptorAttribute, IInvocation, Type } from '../../../src/lib';

export class AgentTrackerAttribute extends AgentAttribute implements IInterceptorAttribute, IInterceptor {
  get interceptor(): IInterceptor {
    return this;
  }
  intercept(target: IInvocation, parameters: ArrayLike<any>): any {
    if (!(target.design instanceof Type)) {
      throw new Error('design is not a Type')
    }
    if (!(target.target instanceof Function)) {
      throw new Error('Target is not a Function')
    }
    return target.invoke(parameters);
  }
}
