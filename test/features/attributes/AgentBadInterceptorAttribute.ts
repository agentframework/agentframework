import { IInterceptor, IInterceptorAttribute } from '../../../src/lib';

export class AgentBadInterceptorAttribute implements IInterceptorAttribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  public get interceptor(): IInterceptor {
    return <any>1;
  }
}
