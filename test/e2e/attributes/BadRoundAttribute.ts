import { IInterceptor, IInterceptorAttribute } from '../../../src/lib';

export class BadRoundAttribute implements IInterceptorAttribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  get interceptor(): IInterceptor {
    return <any>1;
  }
}
