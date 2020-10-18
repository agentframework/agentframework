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

/**
 * invoke without interceptors, better performance
 */
export class DirectMethodInvocation implements PropertyInvocation {
  constructor(readonly design: PropertyInfo, protected readonly target: Function) {}

  // get name(): PropertyKey {
  //   return this._design.key;
  // }

  // get design(): PropertyInfo {
  //   return this._design;
  // }

  // get target(): Function {
  //   return this._design.declaringType;
  // }

  invoke(params: Arguments, receiver: any): any {
    return Reflect.apply(this.target, receiver, params);
  }
}
