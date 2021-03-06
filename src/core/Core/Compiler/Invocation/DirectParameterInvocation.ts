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

import { ParameterInvocation } from '../../Interfaces/TypeInvocations';
import { ParameterInfo } from '../../Interfaces/ParameterInfo';
import { Arguments } from '../../Interfaces/Arguments';

/**
 * @ignore
 * @hidden
 */
export class DirectParameterInvocation implements ParameterInvocation {
  constructor(readonly design: ParameterInfo) {}

  // parameters[0] = value of index
  // parameters[1] = index of this parameter
  // parameters[2] = all parameters
  invoke(params: Arguments, receiver: any): any {
    return params[this.design.index];
  }
}
