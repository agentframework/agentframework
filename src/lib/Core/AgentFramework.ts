import { Type } from './Reflection/Type';
import { Constructor } from './Constructor';
import { Agents, Resolve, ResolveType } from './Cache';
import { AgentAttribute } from './AgentAttribute';
import { CanDecorate } from '../Compiler/Internal/Utils';
import { CreateAgentInvocation } from '../Compiler/CreateAgentInvocation';

export class AgentFramework {
  /**
   * Compile a class with @decorators into agent (add support for Interceptor and Initializer)
   */
  public static Compile<U extends T, T>(target: Constructor<T>, agentAttribute?: AgentAttribute): Constructor<U> {
    // the attributes to initialize agent constructor
    // current only support only one initializer, multiple interceptors
    if (!agentAttribute) {
      agentAttribute = Resolve(AgentAttribute);
    }
    if (!CanDecorate(agentAttribute, target)) {
      throw new TypeError('Unable to decorate ' + agentAttribute.constructor.name + ' on type: ' + target.name);
    }
    // const invocation = CreateAgentInvocation(target, agentAttribute);
    return CreateAgentInvocation(target, agentAttribute).invoke(arguments);
  }

  /**
   * Reflector is the interface to access type data from class or class instance or class prototype
   */
  public static Reflector(target: Function | Object): Type {
    let ctor;
    if ('function' === typeof target) {
      ctor = target;
    } else if ('object' === typeof target) {
      // if a object hasOwnPropertyDescriptor('constructor') then this object is a prototype
      const constructor = Object.getOwnPropertyDescriptor(target, 'constructor');
      if (constructor && 'function' === typeof constructor.value) {
        return ResolveType(target);
      } else {
        // this object is not a prototype, so we find it's constructor
        ctor = target.constructor;
      }
    } else {
      // number, boolean
      throw new TypeError(`Reflection target type is not supported`);
    }

    let proto;
    // make sure get the prototype of origin type
    if (Agents.has(ctor)) {
      proto = Agents.get(ctor)!.prototype;
    } else {
      proto = ctor.prototype;
    }
    return ResolveType(proto);
  }
}
