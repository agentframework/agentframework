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

import { IInvocation } from '../../Core/IInvocation';
import { Parameter } from '../../Reflection/Parameter';

/**
 * @ignore
 * @hidden
 */
export class ParameterInvocation implements IInvocation {
  constructor(private _target: Function, private _design: Parameter<any>) {}

  get design(): Parameter<any> {
    return this._design;
  }

  get target(): Function {
    return this._target;
  }

  invoke(parameters: ArrayLike<any>): any {
    // parameters[0] = value of index
    // parameters[1] = index of this parameter
    // parameters[2] = all parameters
    return parameters[0];
  }
}
