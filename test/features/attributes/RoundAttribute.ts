import { IInterceptor, IInterceptorAttribute, IInvocation } from '../../../src/lib';

export class RoundAttribute implements IInterceptorAttribute, IInterceptor {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  public intercept(target: IInvocation, parameters: ArrayLike<any>): any {
    console.log(typeof target.target);
    console.log(typeof target.design);

    const num = target.invoke(parameters);
    if ('number' !== typeof num) {
      return 0;
    }
    const rnd = Math.round(num);
    console.log('Round', num, rnd);
    return rnd;
  }

  public get interceptor(): IInterceptor {
    return this;
  }
}
