import { Attribute } from '../Attribute';
import { AgentTypeInvocation } from './Invocation/AgentTypeInvocation';
import { ClassTypeInvocation } from './Invocation/ClassTypeInvocation';
import { OnDemandInterceptorFactory } from './OnDemandInterceptorFactory';
import { TypeInvocation } from '../TypeInvocations';
import { PropertyInfo } from '../Reflection/PropertyInfo';
import { Invocation } from '../Invocation';
import { TypeInfo } from '../Reflection/TypeInfo';
import { OnDemandParameterInterceptor } from './Interceptor/OnDemandParameterInterceptor';
import { OnDemandTypeInfo } from '../Reflection/OnDemandTypeInfo';
import { ClassConstructorState } from '../Knowledges/ClassConstructors';

export class OnDemandInvocationFactory {
  /**
   * this function output is NOT cached
   * the type generated by this chain is been CACHED by domain
   *
   * @internal
   */
  static createAgentInvocation(target: Function, attribute: Attribute): TypeInvocation {
    const design: TypeInfo = OnDemandTypeInfo.find(target);
    let chain: Invocation<TypeInfo> = new AgentTypeInvocation(target, design);
    chain = OnDemandInterceptorFactory.addInterceptor(chain, attribute);
    if (design.version) {
      chain = OnDemandInterceptorFactory.addInterceptors(chain, design.ownInterceptors);
    }
    return chain;
  }

  /**
   * this chain is been cached by caller
   *
   * @internal
   */
  static createConstructorInvocation(target: Function): ClassConstructorState {
    const design = OnDemandTypeInfo.find(target.prototype);
    let chain: Invocation<TypeInfo> = new ClassTypeInvocation(target, design);
    if (design.version) {
      if (design.hasParameter()) {
        chain = OnDemandInterceptorFactory.addInterceptor(chain, new OnDemandParameterInterceptor(design));
      }
      chain = OnDemandInterceptorFactory.addInterceptors(chain, design.ownInterceptors);
    }
    return { invocation: chain, version: design.version, design: design };
  }

  /**
   * @internal
   */
  static createPropertyInvocation<T extends PropertyInfo>(
    invocation: Invocation<T>,
    property: PropertyInfo
  ): Invocation<T> {
    return OnDemandInterceptorFactory.addInterceptors(invocation, property.ownInterceptors);
  }
}
