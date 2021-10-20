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
    const design = target.design;
    let chain = ChainFactory.addInterceptor(target, attribute);
    if (design.hasOwnInterceptor()) {
      chain = ChainFactory.addInterceptors(chain, design.getOwnInterceptors());
    }
    const shared = this.agent;
    if (shared.hasInterceptor()) {
      chain = ChainFactory.addInterceptors(chain, shared.getOwnInterceptors());
    }
    target.version = design.version + shared.version;
    return chain;
  }

  // this function output is been cached by caller
  static createClassInvocation(receiver: Function): TypeInvocation {
    const target = new ConstructorInvocation(receiver);
    const design = target.design;
    let chain: TypeInvocation = target;
    if (design.hasParameter()) {
      chain = ChainFactory.addParameterInterceptor(chain, design);
    }
    if (design.hasOwnInterceptor()) {
      chain = ChainFactory.addInterceptors(chain, design.getOwnInterceptors());
    }
    const shared = this.class;
    // find all attribute from prototype
    if (shared.hasParameter()) {
      chain = ChainFactory.addParameterInterceptor(chain, shared);
    }
    if (shared.hasOwnInterceptor()) {
      chain = ChainFactory.addInterceptors(chain, shared.getOwnInterceptors());
    }
    target.version = design.version + shared.version;
    return chain;
  }

  static createPropertyInvocation<T extends PropertyInfo>(
    invocation: Invocation<T>,
    property: PropertyInfo
  ): Invocation<T> {
    let chain = invocation;
    if (property.hasOwnInterceptor()) {
      chain = ChainFactory.addInterceptors(chain, property.getOwnInterceptors());
    }
    const shared = this.class.getOwnProperty(property.key);
    if (shared && shared.hasOwnInterceptor()) {
      chain = ChainFactory.addInterceptors(chain, shared.getOwnInterceptors());
    }
    return chain;
  }
}
