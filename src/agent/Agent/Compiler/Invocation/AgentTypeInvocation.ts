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
import { alter } from '../alter';
import { RememberType } from '../../Knowledges/Types';

/**
 * Upgrade class to agent
 *
 * @ignore
 * @hidden
 */
export class AgentTypeInvocation implements TypeInvocation {
  constructor(readonly target: Function, readonly design: TypeInfo) {}

  invoke([id]: any, receiver: any): any {
    // dont do any change if no changes to the target
    // that means no initializers defined
    const newReceiver = alter(class extends receiver {}, 'name', { value: `${id}$` });
    RememberType(newReceiver, this.target);
    return newReceiver;
  }
}
