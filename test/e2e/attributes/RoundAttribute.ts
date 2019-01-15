
import { IInterceptor, IInvocation, Member, IAttribute } from '../../../src/lib';

export class RoundAttribute implements IAttribute, IInterceptor {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  public intercept(target: IInvocation, parameters: ArrayLike<any>): any {
    // interceptor is working on method, it should be a function target
    expect(target.design instanceof Member).toBeTruthy();
    const num = target.invoke(parameters);
    if ('number' !== typeof num) {
      return 0;
    }
    return Math.round(num);
  }

  public get interceptor(): IInterceptor {
    return this;
  }
}
