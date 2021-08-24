import { Attribute } from '../Interfaces/Attribute';
import { AgentInvocation } from './Invocation/AgentInvocation';
import { ConstructorInvocation } from './Invocation/ConstructorInvocation';
import { ChainFactory } from './ChainFactory';
import { Agent } from '../Agent/Agent';
import { Reflector } from '../Reflection/Reflector';
import { remember } from '../Decorators/Remember/remember';
import { TypeInvocation } from '../Interfaces/TypeInvocations';
import { PropertyInfo } from '../Interfaces/PropertyInfo';
import { Invocation } from '../Interfaces/Invocation';

export class InvocationFactory {
  @remember()
  static get class() {
    return Reflector(Agent);
  }

  @remember()
  static get agent() {
    return this.class.static;
  }

  // this function output is NOT cached
  static createAgentInvocation(receiver: Function, attribute: Attribute): TypeInvocation {
    const target = new AgentInvocation(receiver);
    const design = target.design;

    // todo: cache the chain for this target
    const interceptors = design.getOwnInterceptors();

    let chain = ChainFactory.chainInterceptors(target, interceptors);
    chain = ChainFactory.addInterceptor(chain, attribute);
    return ChainFactory.chainInterceptors(chain, this.agent.getOwnInterceptors());
  }

  // this function output is been cached by caller
  static createClassInvocation(receiver: Function): TypeInvocation {
    const target = new ConstructorInvocation(receiver);
    const design = target.design;
    // find all attribute from prototype
    // const interceptors = property.findOwnAttributes(HasInterceptor);
    let chain = design.findTypes().reduce((chain, type) => {
      return ChainFactory.chainInterceptors(chain, type.getOwnInterceptors());
    }, ChainFactory.addParameterInterceptor(target, design));
    // TODO: reverse()
    // .findTypes() => end, middle, base, object
    // .findTypes().reverse() => object, base, middle, end
    if (this.class.hasInterceptor()) {
      chain = ChainFactory.addParameterInterceptor(chain, this.class);
      return ChainFactory.chainInterceptors(chain, this.class.getOwnInterceptors());
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
      chain = ChainFactory.chainInterceptors(chain, sharedInterceptors);
    }
    return chain;
  }
}
