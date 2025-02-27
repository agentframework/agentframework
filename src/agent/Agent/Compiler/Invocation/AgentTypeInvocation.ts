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

import { TypeInfo } from '../../Reflection/TypeInfo';
import { TypeInvocation } from '../../TypeInvocations';
import { RememberType } from '../../Knowledges/Types';
import { Arguments } from '../../Arguments';
import { AgentAttribute } from '../../AgentAttribute';

/**
 * Upgrade class to agent
 *
 * @ignore
 * @hidden
 */
export class AgentTypeInvocation implements TypeInvocation {
  constructor(readonly target: Function, readonly design: TypeInfo) { }

  invoke([attribute, agent]: Arguments, receiver: any): any {
    // we don't use Proxy, but use customize class
    function construct(this: AgentAttribute, target: any, proxy: any, cache: any, params: any, newTarget: any): any {
      if (this.construct) {
        return this.construct(target, params, newTarget, proxy, cache);
      }
      return Reflect.construct(target, params, newTarget);
    }
    const newReceiver = Reflect.construct(agent, [receiver, construct.bind(attribute)], receiver) as Function;
    RememberType(newReceiver, this.target);
    return newReceiver;
  }
}
