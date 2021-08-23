import { Attribute } from '../Interfaces/Attribute';
import { AgentInvocation } from './Invocation/AgentInvocation';
import { ConstructorInvocation } from './Invocation/ConstructorInvocation';
import { ChainFactory } from './ChainFactory';
import { Agent } from '../Agent/Agent';
import { Reflector } from '../Reflection/Reflector';
import { remember } from '../Decorators/Remember/remember';
import { TypeInvocation } from '../Interfaces/TypeInvocations';

export class InvocationFactory {
  @remember()
  static get class() {
    return Reflector(Agent);
  }

  @remember()
  static get agent() {
    return this.class.static;
  }

  // this function output is been cached by caller
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
    const interceptorArrays = design
      .findTypes()
      .map((type) => type.getOwnInterceptors())
      .reverse();
    // .findTypes() => end, middle, base, object
    // .findTypes().reverse() => object, base, middle, end
    const emptyArray: Array<Attribute> = [];
    const interceptors = emptyArray.concat(...interceptorArrays);

    // create interceptor
    let chain = ChainFactory.chainInterceptors(target, interceptors);

    chain = ChainFactory.addParameterInterceptor(chain);

    return ChainFactory.chainInterceptors(chain, this.class.getOwnInterceptors());
  }
}
