import { IInterceptor, IInterceptorAttribute, IInvocation, Member } from '../../../src/lib';

export class RoundAttribute implements IInterceptorAttribute, IInterceptor {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  public intercept(target: IInvocation, parameters: ArrayLike<any>): any {
    expect(typeof target.target).toBe('object');
    if (target.design) {
      // console.log('design', target.design)
      expect(target.design instanceof Member).toBeTruthy();
    } else {
      expect(target.design).toBeUndefined();
    }
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
