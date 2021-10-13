import { Attribute } from '../../Core/Annotation/Attribute';
import { AgentInvocation } from './Invocation/AgentInvocation';
import { ConstructorInvocation } from './Invocation/ConstructorInvocation';
import { ChainFactory } from './ChainFactory';
import { Agent } from '../Agent';
import { Reflector } from '../Reflector';
import { TypeInvocation } from '../../Core/Annotation/TypeInvocations';
import { PropertyInfo } from '../../Core/Reflection/PropertyInfo';
import { Invocation } from '../../Core/Annotation/Invocation';
import { Once } from '../../Core/Decorators/Once';
import { TypeInfo } from '../../Core/Reflection/TypeInfo';

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

    const interceptors = design.getOwnInterceptors();
    let chain = ChainFactory.chainInterceptors(target, interceptors);
    // todo: cache the chain for this target
    // let chain = design.findTypes().reduce((chain, type) => {
    //   return ChainFactory.chainInterceptors(chain, type.getOwnInterceptors());
    // }, ChainFactory.chainInterceptors(target, interceptors));

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
