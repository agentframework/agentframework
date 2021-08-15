/* tslint:disable */

import { Arguments, Interceptor, Invocation, MemberKinds } from '../../../src';

export class AgentTrackerAttribute implements Interceptor {
  get interceptor(): Interceptor {
    return this;
  }
  intercept(target: Invocation, parameters: Arguments, receiver: any): any {
    if ((target.design.kind & MemberKinds.Class) !== MemberKinds.Class) {
      throw new Error('design is not a Type: ' + target.design.kind);
    }
    return target.invoke(parameters, receiver);
  }
}
