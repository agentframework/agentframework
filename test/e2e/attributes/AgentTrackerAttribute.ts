/* tslint:disable */

import { Arguments, Interceptor, Invocation } from '../../../lib';
import { OnDemandTypeInfo } from '../../../src/core/Core/Reflection/OnDemandTypeInfo';

export class AgentTrackerAttribute implements Interceptor {
  get interceptor(): Interceptor {
    return this;
  }
  intercept(target: Invocation, parameters: Arguments, receiver: any): any {
    if (!(target.design instanceof OnDemandTypeInfo)) {
      throw new Error('design is not a Type');
    }
    return target.invoke(parameters, receiver);
  }
}
