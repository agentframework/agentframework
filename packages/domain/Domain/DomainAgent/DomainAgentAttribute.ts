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

import { AgentAttribute, Arguments, TypeInterceptor, TypeInvocation } from '@agentframework/agent';
import { RememberDomainAgentType } from '../Knowledges/DomainAgentTypes/RememberDomainAgentType';
import { DomainLike } from '../DomainLike';
import { Initializer } from '../Initializer';


export class DomainAgentAttribute extends AgentAttribute implements TypeInterceptor {

  constructor(readonly domain: DomainLike) {
    super();
  }

  // get name() {
  //   // the name must be a valid class name.
  //   const name = this.domain.constructor.name;
  //   const fdx = name.lastIndexOf('__');
  //   if (fdx > 0) {
  //     return name.slice(fdx + 2);
  //   }
  //   return name;
  // }

  // target: the origin type
  // receiver: upgraded agent type
  intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
    // NOTE: check if the agent's type has cached in domain or parent domain
    //       return the cached agent type if found
    const [, type] = params as any;
    let newReceiver = this.domain.getAgentType(type);
    if (!newReceiver) {
      newReceiver =  target.invoke(params, receiver);
      RememberDomainAgentType(this.domain, type, newReceiver);
    }

    // const declaringType = target.design.declaringType;
    // const initializer = Reflect.get(declaringType, Initializer, receiver);
    // if (initializer) {
    //   if ('function' !== typeof initializer) {
    //     throw new AgentFrameworkError('ClassInitializerIsNotFunction');
    //   }
    //   newReceiver =  Reflect.apply(initializer, declaringType, arguments);
    // } else {
    //   newReceiver =  target.invoke(params, receiver);
    // }

    return newReceiver;
  }

  construct<T extends Function>(type: T, params: Arguments, receiver: T, proxy: T, cache: T): any {
    const instance = super.construct(type, params, receiver, proxy, cache);
    const initializer = Reflect.get(instance, Initializer);
    if ('function' === typeof initializer) {
      Reflect.apply(initializer, instance, params);
    }
    return instance;
  }
}
