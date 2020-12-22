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

// /**
//  * Convert a type to agent
//  */
// export function Agent<T extends object>(target: Constructor<T>): Constructor<T> {
//   // the attributes to initialize agent constructor
//   // current only support only one initializer, multiple interceptors
//   // make sure one attribute for one target
//   return CreateAgent(target);
// }

import { Arguments, ClassInvocation, Reflector } from '../../../dependencies/core';
import { InMemoryDomain } from '../InMemoryDomain';
import { GetLocalDomain } from '../Helpers/GetLocalDomain';

/**
 * Define an agent
 */
export function agent(): ClassDecorator {
  // return decorateAgent(new DomainAgentAttribute());
  // return decorateAgent(new DomainAgentAttribute(), [new ClassInitializerAttribute()]);
  return <F extends Function>(target: F): F => {
    const domain = GetLocalDomain(InMemoryDomain);
    // register this agent after create new instance
    Reflector(target).addAttribute({
      interceptor: {
        intercept(target: ClassInvocation, params: Arguments, receiver: Function) {
          const agent = target.invoke(params, receiver);
          domain.addInstance(receiver, agent);
          return agent;
        },
      },
    });
    return domain.getAgent(target) || domain.createAgent(target);
  };
}
