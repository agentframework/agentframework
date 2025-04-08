/* tslint:disable */

import { Arguments, TypeInvocation, Interceptor, MemberKinds, AgentAttribute } from '../../../packages/dependencies/agent';

export class AgentTrackerAttribute extends AgentAttribute implements Interceptor {
  get interceptor(): Interceptor {
    return this;
  }
  intercept(target: TypeInvocation, parameters: Arguments, receiver: any): any {
    if ((target.design.kind & MemberKinds.Class) !== MemberKinds.Class) {
      throw new Error('design is not a Type: ' + target.design.kind);
    }
    return target.invoke<Function>(parameters, receiver);
  }
}
