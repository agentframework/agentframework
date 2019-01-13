import { Reflector } from './Reflection/Reflector';
import { decorateAgent } from './Decorator/decorateAgent';
import { AgentAttribute } from './Compiler/AgentAttribute';
import { IAttribute } from './Core/IAttribute';
import { Resolve } from './Internal/Resolve';
import { Constructor } from './Compiler/Constructor';
import { CanDecorate } from './Compiler/Internal/Utils';
import { CreateAgentInvocation } from './Compiler/CreateAgentInvocation';

// ===========================================
// ES6 and after
// ===========================================
function metadata(this: any, target: Function | Object, property?: string | symbol, descriptor?: PropertyDescriptor) {
  if (property) {
    Reflector(target)
      .property(property, descriptor)
      .addMetadata(this.key, this.value);
  } else {
    Reflector(target).addMetadata(this.key, this.value);
  }
}
Reflect['metadata'] = function(key: string, value: any) {
  return metadata.bind({ key, value });
};

/**
 * Define an agent
 */
export function agent(attributes?: IAttribute[]) {
  return decorateAgent(Resolve(AgentAttribute), attributes);
}

/**
 * Upgrade a class with @decorators into agent (add support for Interceptor and Initializer)
 */
export function Agent<T>(target: Constructor<T>, options?: AgentAttribute): Constructor<T> {
  // the attributes to initialize agent constructor
  // current only support only one initializer, multiple interceptors
  if (!options) {
    options = Resolve(AgentAttribute);
  }
  if (CanDecorate(options, target)) {
    return CreateAgentInvocation(target, options);
  }
  return target;
}
