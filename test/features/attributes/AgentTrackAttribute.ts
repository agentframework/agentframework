import { IInterceptor, IInterceptorAttribute, IInvocation } from '../../../src/lib';

export class AgentTrackAttribute implements IInterceptorAttribute, IInterceptor {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  public intercept(target: IInvocation, parameters: ArrayLike<any>): any {
    return target.invoke(parameters);
  }

  public get interceptor(): IInterceptor {
    return this;
  }
}
