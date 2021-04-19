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

import { PropertyInvocation } from '../../Interfaces/TypeInvocations';
import { PropertyInfo } from '../../Interfaces/PropertyInfo';
import { Arguments } from '../../Interfaces/Arguments';
import { define } from '../../Helpers/Prototype';
import { AgentFrameworkError } from '../../Error/AgentFrameworkError';

/**
 * @ignore
 * @hidden
 */
export class GetterSetterInvocation implements PropertyInvocation {
  constructor(readonly design: PropertyInfo) {}

  invoke(params: Arguments, receiver: any): any {
    if (params.length) {
      if (receiver == null) {
        throw new AgentFrameworkError(`InvalidReceiver`);
      }
      // how to know the value of a field before you create that class
      // return the value from prototype is a good choose? NO, it may cause infinite loops
      const value = params[0];
      define(receiver, this.design.key, { value, writable: true, configurable: true });
      return value;
    }
    return params[0];
  }
}
