/* tslint:disable */

import { Arguments, ClassInvocation, Interceptor, MemberKinds } from '../../../src/dependencies/agent';

export class AgentTrackerAttribute implements Interceptor {
  get interceptor(): Interceptor {
    return this;
  }
  intercept(target: ClassInvocation, parameters: Arguments, receiver: any): any {
    if ((target.design.kind & MemberKinds.Class) !== MemberKinds.Class) {
      throw new Error('design is not a Type: ' + target.design.kind);
    }
    return target.invoke<Function>(parameters, receiver);
  }
}
