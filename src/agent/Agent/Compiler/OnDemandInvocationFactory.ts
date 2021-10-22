import { Attribute } from '../Attribute';
import { AgentInvocation } from './Invocation/AgentInvocation';
import { ConstructorInvocation } from './Invocation/ConstructorInvocation';
import { OnDemandInterceptorFactory } from './OnDemandInterceptorFactory';
import { ClassInvocation } from '../TypeInvocations';
import { PropertyInfo } from '../Reflection/PropertyInfo';
import { Invocation } from '../Invocation';
import { TypeInfo } from '../Reflection/TypeInfo';
import { OnDemandParameterInterceptor } from './Interceptor/OnDemandParameterInterceptor';
import { CONSTRUCTOR } from '../WellKnown';
import { OnDemandTypeInfo } from '../Reflection/OnDemandTypeInfo';

export class OnDemandInvocationFactory {
  /**
   * this function output is NOT cached
   *
   * @internal
   */
  static createAgentInvocation(receiver: Function, attribute: Attribute): ClassInvocation {
    const target: Invocation<TypeInfo> = new AgentInvocation(receiver);
    const design = target.design;
    let chain = OnDemandInterceptorFactory.addInterceptor(target, attribute);
    chain = OnDemandInterceptorFactory.addInterceptors(chain, design.getOwnInterceptors());
    return chain;
  }

  /**
   * this function output is been cached by caller
   *
   * @internal
   */
  static createConstructorInvocation(receiver: Function): Invocation<TypeInfo> {
    const type = OnDemandTypeInfo.find(receiver.prototype);
    const design = type.property(CONSTRUCTOR);
    let chain: Invocation<TypeInfo> = new ConstructorInvocation(receiver, type);
    if (design.hasParameter()) {
      chain = OnDemandInterceptorFactory.addInterceptor(chain, new OnDemandParameterInterceptor(design));
    }
    chain = OnDemandInterceptorFactory.addInterceptors(chain, design.getOwnInterceptors());
    return chain;
  }

  /**
   * @internal
   */
  static createPropertyInvocation<T extends PropertyInfo>(
    invocation: Invocation<T>,
    property: PropertyInfo
  ): Invocation<T> {
    let chain = invocation;
    chain = OnDemandInterceptorFactory.addInterceptors(chain, property.getOwnInterceptors());
    return chain;
  }
}
