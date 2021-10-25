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

import { AgentAttribute, Arguments, TypeInterceptor, TypeInvocation } from '../../../dependencies/agent';
import { DomainLike } from '../DomainLike';

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
  // receiver: intercepted type
  intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
    // NOTE: cache agent type in domain
    let agent = this.domain.getAgentType(receiver);
    if (!agent) {
      agent = super.intercept(target, params, receiver);
      this.domain.setAgentType(receiver, agent);
    }
    return target.invoke<any>(params, agent);
  }
}
