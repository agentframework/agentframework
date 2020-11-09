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

import { TypeInfo } from '../Interfaces/TypeInfo';
import { ClassInvocation } from '../Interfaces/TypeInvocations';

/**
 * Upgrade class to agent
 *
 * @ignore
 * @hidden
 */
export class AgentInvocation implements ClassInvocation {
  constructor(readonly design: TypeInfo) {}

  invoke([compiler, name, code, data]: any, receiver: any): any {
    // dont do any change if no changes to the target
    // that means no initializers defined
    if (typeof code !== 'string') {
      return receiver;
    }
    return Reflect.construct(compiler, [name, code + ` { /* [${data}] */ }`])(receiver);
  }
}
