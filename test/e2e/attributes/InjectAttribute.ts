/* tslint:disable */

import { Interceptor, Invocation, Arguments, Attribute, MemberKinds } from '../../../lib';

export class InjectAttribute implements Attribute, Interceptor {
  get interceptor(): Interceptor {
    return this;
  }

  intercept(target: Invocation, parameters: Arguments, receiver: any): any {
    if (target.design.kind == MemberKinds.Property && typeof parameters[0] !== 'undefined') {
      return target.invoke(parameters, receiver);
    }
    if (target.design.type) {
      return Reflect.construct(target.design.type, parameters);
    }
    throw new Error('Unknown type to inject');
  }
}
