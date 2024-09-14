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

/**
 * Upgrade class to agent
 *
 * @ignore
 * @hidden
 */
export class AgentTypeInvocation implements TypeInvocation {
  constructor(readonly target: Function, readonly design: TypeInfo) {}

  invoke([, agent]: Arguments, receiver: unknown): any {
    const newReceiver = Reflect.construct(agent, [receiver]) as Function;
    RememberType(newReceiver, this.target);
    return newReceiver;
  }
}
