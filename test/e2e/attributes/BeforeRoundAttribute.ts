/* tslint:disable */

import { IAttribute, IInterceptor, IInvocation, Member } from '../../../src/lib';

export class BeforeRoundAttribute implements IAttribute, IInterceptor {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  public intercept(target: IInvocation, parameters: ArrayLike<any>): any {
    expect(typeof target.target).toBe('function');
    expect(typeof target.agent).toBe('object');

    if (target.design) {
      // console.log('design', target.design)
      expect(target.design instanceof Member).toBeTruthy();
    } else {
      expect(target.design).toBeUndefined();
    }

    let input = parameters[0];
    if ('number' !== typeof input) {
      input = 0;
    }
    input = Math.round(input);
    return target.invoke([input, parameters[1], parameters[2]]);
  }

  public get interceptor(): IInterceptor {
    return this;
  }
}
