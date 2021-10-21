import { Attribute } from '../Attribute';
import { AgentInvocation } from './Invocation/AgentInvocation';
import { ConstructorInvocation } from './Invocation/ConstructorInvocation';
import { OnDemandInterceptorFactory } from './OnDemandInterceptorFactory';
import { Agent } from '../Agent';
import { Reflector } from '../Reflector';
import { TypeInvocation } from '../TypeInvocations';
import { PropertyInfo } from '../Reflection/PropertyInfo';
import { Invocation } from '../Invocation';
import { Once } from '../Decorators/Once/Once';
import { TypeInfo } from '../Reflection/TypeInfo';

export class OnDemandInvocationFactory {
  static get class() {
    return Once(this, 'class', Reflector(Agent));
  }

  static get agent() {
    return Once(this, 'agent', this.class.static);
  }

  /**
   * this function output is NOT cached
   *
   * @internal
   */
  static createAgentInvocation(receiver: Function, attribute: Attribute): TypeInvocation {
    const target: Invocation<TypeInfo> = new AgentInvocation(receiver);
    const design = target.design;
    let chain = OnDemandInterceptorFactory.addInterceptor(target, attribute);
    chain = OnDemandInterceptorFactory.addInterceptors(chain, design.getOwnInterceptors());
    const shared = this.agent;
    chain = OnDemandInterceptorFactory.addInterceptors(chain, shared.getOwnInterceptors());
    target.version = design.version + shared.version;
    return chain;
  }

  /**
   * this function output is been cached by caller
   *
   * @internal
   */
  static createClassInvocation(receiver: Function): TypeInvocation {
    const target = new ConstructorInvocation(receiver);
    const design = target.design;
    let chain: TypeInvocation = target;
    chain = OnDemandInterceptorFactory.addParameterInterceptor(chain, design);
    chain = OnDemandInterceptorFactory.addInterceptors(chain, design.getOwnInterceptors());
    const shared = this.class;
    // find all attribute from prototype
    chain = OnDemandInterceptorFactory.addParameterInterceptor(chain, shared);
    chain = OnDemandInterceptorFactory.addInterceptors(chain, shared.getOwnInterceptors());
    target.version = design.version + shared.version;
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
    const shared = this.class.getOwnProperty(property.key);
    if (shared) {
      chain = OnDemandInterceptorFactory.addInterceptors(chain, shared.getOwnInterceptors());
    }
    return chain;
  }
}
