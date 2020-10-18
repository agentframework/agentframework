/* tslint:disable */
import { Arguments, Attribute, Interceptor, ClassInvocation } from '../../../lib';
import { OnDemandTypeInfo } from '../../../src/core/Core/Reflection/OnDemandTypeInfo';

export class AgentChecker implements Attribute, Interceptor {
  get interceptor(): Interceptor {
    return this;
  }

  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  public intercept(target: ClassInvocation, parameters: Arguments, receiver: any): any {
    expect(target.design instanceof OnDemandTypeInfo).toBeTruthy();
    return target.invoke(Array.prototype.slice.call(parameters, 0), receiver);
  }
}
