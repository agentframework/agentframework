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
import { Method } from '../../Reflection/Method';
import { Property } from '../../Reflection/Property';

export class DirectMethodInvocation implements IInvocation {
  constructor(
    readonly _target: Function,
    readonly method: Function,
    readonly _design: Method<Property>,
    private _newAgent?: object
  ) {}

  get design(): Method<Property> {
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
    return Reflect.apply(this.method, this._newAgent, parameters);
  }
}

export class InterceptedMethodInvocation implements IInvocation {
  constructor(
    readonly _target: Function,
    readonly method: Function,
    readonly _design: Method<Property>,
    readonly params: Map<number, [IInvocation, IInvocation]>,
    private _newAgent?: object
  ) {}

  get design(): Method<Property> {
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
    for (const [, [origin]] of this.params.entries()) {
      Reflect.set(origin, 'agent', value);
    }
  }

  invoke(parameters: ArrayLike<any>) {
    const params = Array.prototype.slice.call(parameters, 0);
    for (const [idx, [, interceptor]] of this.params.entries()) {
      params[idx] = interceptor.invoke([parameters[idx], idx, parameters]);
    }
    return Reflect.apply(this.method, this._newAgent, params);
  }
}
