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

  invoke([attribute, agent, Proxy]: Arguments, receiver: any): any {
    // we don't use Proxy, but use customize class
    const design = this.design.prototype;
    function init(this: AgentAttribute, target: any, proxy: any, cache: any, params: any, receiver: any): void {
      console.log('init', arguments);
      this.upgrade(target, proxy, cache, design);
    }
    function construct(this: AgentAttribute, target: any, proxy: any, cache: any, params: any, receiver1: any): any {
      // console.log('target', target);
      // console.log('proxy', proxy);
      // this.upgrade(target, proxy, cache, design);
      // console.log('cache', cache);
      //console.log('same', receiver === receiver1, receiver, receiver1)
      return this.construct(target, params, receiver1);
    }
    const newReceiver = Reflect.construct(agent, [receiver, init.bind(attribute), construct.bind(attribute), ], receiver) as Function;
    RememberType(newReceiver, this.target);
    return newReceiver;
  }
}
