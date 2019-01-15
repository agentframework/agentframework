import 'jasmine';
import { IInterceptor, IAttribute } from '../../../src/lib';

export class BadRoundAttribute implements IAttribute {
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
