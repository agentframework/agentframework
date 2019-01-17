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
import { Property } from '../../Reflection/Property';

/**
 * @ignore
 * @hidden
 */
export class FieldInvocation implements IInvocation {
  constructor(
    private _target: Function,
    _propertyKey: PropertyKey,
    private _design: Property,
    private _newAgent?: object
  ) {}

  get design(): Property {
    return this._design;
  }

  get target(): Function {
    return this._target;
  }

  get agent(): object | undefined {
    return this._newAgent;
  }

  set agent(value: object | undefined) {
    this._newAgent = value;
  }
  
  invoke(parameters: ArrayLike<any>): any {
    // how to know the value of a field before you create that class
    // return the value from prototype is a good choose? NO, it may cause infinite loops
    return undefined;
  }
}
