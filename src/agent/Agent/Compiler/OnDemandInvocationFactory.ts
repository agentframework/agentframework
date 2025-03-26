import { ClassTypeInvocation } from './Invocation/ClassTypeInvocation';
import { OnDemandInterceptorFactory } from './OnDemandInterceptorFactory';
import { PropertyInfo } from '../Reflection/PropertyInfo';
import { Invocation } from '../Invocation';
import { TypeInfo } from '../Reflection/TypeInfo';
import { OnDemandParameterInterceptor } from './Interceptor/OnDemandParameterInterceptor';
import { ClassConstructorState } from '../Knowledges/ClassConstructors';
import { GetterSetterInvocation } from './Invocation/GetterSetterInvocation';
import { MethodInvocation } from './Invocation/MethodInvocation';
import { AgentTypeInvocation } from './Invocation/AgentTypeInvocation';
import { TypeInvocation } from '../TypeInvocations';
import { Attribute } from '../Attribute';

export class OnDemandInvocationFactory {
  /**
   * this function output is NOT cached
   * the type generated by this chain is been CACHED by domain
   *
   * @internal
   */
  static createAgentInvocation(
    target: Function,
    type: TypeInfo,
    design: PropertyInfo,
    attribute: Attribute
  ): TypeInvocation {
    let chain: TypeInvocation = new AgentTypeInvocation(target, type);
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
  static createConstructorInvocation(target: Function, type: TypeInfo, design: PropertyInfo): ClassConstructorState {
    let chain: Invocation<TypeInfo> = new ClassTypeInvocation(target, type);
    if (design.hasParameter()) {
      chain = OnDemandInterceptorFactory.addInterceptor(chain, new OnDemandParameterInterceptor(design));
    }
    chain = OnDemandInterceptorFactory.addInterceptors(chain, design.ownInterceptors);
    return { invocation: chain, version: design.version };
  }

  /**
   * @internal
   */
  static createFieldInvocation<T extends PropertyInfo>(property: T, cache: WeakMap<any, any>): Invocation<T> {
    let chain: Invocation<T> = new GetterSetterInvocation(property, cache);
    return OnDemandInterceptorFactory.addInterceptors<T>(chain, property.ownInterceptors);
  }

  /**
   * @internal
   */
  static createPropertyInvocation<T extends PropertyInfo>(method: Function, property: T): Invocation<T> {
    let chain: Invocation<T> = new MethodInvocation(method, property);
    if (property.hasParameter()) {
      chain = OnDemandInterceptorFactory.addInterceptor(chain, new OnDemandParameterInterceptor(property));
    }
    return OnDemandInterceptorFactory.addInterceptors(chain, property.ownInterceptors);
  }
}
