/* Copyright 2016 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

import { Reflector } from './Reflection/Reflector';
import { decorateAgent } from './Decorator/decorateAgent';
import { AgentAttribute } from './Compiler/AgentAttribute';
import { IAttribute } from './Core/IAttribute';
import { Resolve } from './Internal/Resolve';
import { Constructor } from './Compiler/Constructor';
import { CanDecorate } from './Compiler/Internal/Utils';
import { CreateAgentInvocation } from './Compiler/CreateAgentInvocation';

/* istanbul ignore next */
let polyfill: any = function () {
  /* tslint:disable */
  return function () { };
  /* tslint:enable */
};

/* istanbul ignore next */
if (Reflect['metadata'] && !Reflect['metadata']['af']) {
  // because we know this is polyfill that's why we do current implementation
  // if one day the browser implemented Reflect.metadata. We will reflector all
  // metadata data related code to have better performance.
  polyfill = Reflect['metadata'];
}

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
  this.polyfill(target, property, descriptor);
}
Reflect['metadata'] = function (key: string, value: any) {
  return metadata.bind({ key, value, polyfill: polyfill.apply(this, [key, value]) });
};
Reflect['metadata']['af'] = true;
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
