import { IAttribute, IInterceptor, IInvocation, Type } from '../../../src/lib';

export class AgentChecker implements IAttribute, IInterceptor {
  get interceptor(): IInterceptor {
    return this;
  }

  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  public intercept(target: IInvocation, parameters: ArrayLike<any>): any {
    expect(target.design instanceof Type).toBeTruthy();
    expect(typeof target.target).toBe('function');
    return target.invoke(Array.prototype.slice.call(parameters, 0));
  }
}
