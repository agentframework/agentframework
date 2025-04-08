/* tslint:disable */

import { Arguments, Attribute, Interceptor, Invocation  } from '../../../packages/dependencies/agent';

export class BeforeRoundAttribute implements Attribute, Interceptor {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  intercept(target: Invocation, parameters: Arguments, receiver: any): any {
    if (target.design) {
      // console.log('design', target.design)
      expect(target.design.constructor.name).toBe('OnDemandPropertyInfo');
    } else {
      expect(target.design).toBeUndefined();
    }

    let input = parameters[0];
    if ('number' !== typeof input) {
      input = 0;
    }
    input = Math.round(input);
    return target.invoke([input, parameters[1], parameters[2]], receiver);
  }

  get interceptor(): Interceptor {
    return this;
  }
}
