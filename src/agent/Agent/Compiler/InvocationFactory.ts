import { Attribute } from '../Attribute';
import { AgentInvocation } from './Invocation/AgentInvocation';
import { ConstructorInvocation } from './Invocation/ConstructorInvocation';
import { ChainFactory } from './ChainFactory';
import { Agent } from '../Agent';
import { Reflector } from '../Reflector';
import { TypeInvocation } from '../TypeInvocations';
import { PropertyInfo } from '../Reflection/PropertyInfo';
import { Invocation } from '../Invocation';
import { Once } from '../Decorators/Once/Once';
import { TypeInfo } from '../Reflection/TypeInfo';

export class InvocationFactory {
  static get class() {
    return Once(this, 'class', Reflector(Agent));
  }

  static get agent() {
    return Once(this, 'agent', this.class.static);
  }

  // this function output is NOT cached
  static createAgentInvocation(receiver: Function, attribute: Attribute): TypeInvocation {
    const target: Invocation<TypeInfo> = new AgentInvocation(receiver);
    let chain = ChainFactory.addInterceptor(target, attribute);
    chain = ChainFactory.chainInterceptors(chain, target.design.getOwnInterceptors());
    target.version = target.design.version;
    if (this.agent.hasInterceptor()) {
      chain = ChainFactory.chainInterceptors(chain, this.agent.getOwnInterceptors());
      target.version += this.agent.version;
    }

    return chain;
  }

  // this function output is been cached by caller
  static createClassInvocation(receiver: Function): TypeInvocation {
    const target = new ConstructorInvocation(receiver);
    const design = target.design;
    target.version = design.version;
    // find all attribute from prototype
    let chain = ChainFactory.addParameterInterceptor(target, design);
    chain = ChainFactory.chainInterceptors(chain, design.getOwnInterceptors());
    if (this.class.hasInterceptor()) {
      target.version += this.class.version;
      chain = ChainFactory.addParameterInterceptor(chain, this.class);
      chain = ChainFactory.chainInterceptors(chain, this.class.getOwnInterceptors());
    }
    return chain;
  }

  static createPropertyInvocation<T extends PropertyInfo>(
    invocation: Invocation<T>,
    property: PropertyInfo
  ): Invocation<T> {
    const interceptors = property.getOwnInterceptors();
    let chain = ChainFactory.chainInterceptors(invocation, interceptors);
    const sharedProperty = this.class.getOwnProperty(property.key);
    if (sharedProperty) {
      const sharedInterceptors = sharedProperty.getOwnInterceptors();
      if (sharedInterceptors.length) {
        chain = ChainFactory.chainInterceptors(chain, sharedInterceptors);
      }
    }
    return chain;
  }
}
