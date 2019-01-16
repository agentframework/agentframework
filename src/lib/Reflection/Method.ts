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

import { Member } from './Member';
import { Parameter } from './Parameter';
import { IsNumber } from './Utils';

/**
 * Method
 */
export class Method<P> extends Member<P> {
  private readonly _parameters: Array<Parameter<Method<P>>>;
  private _cachedParameters: Array<Parameter<Method<P>>>;

  constructor(parent: P, public maxParameters: number) {
    super(parent);
    this._parameters = new Array<Parameter<Method<P>>>();
  }

  parameter(index: number): Parameter<Method<P>> {
    // throw error if out of bound
    if (IsNumber(this.maxParameters) && index > this.maxParameters) {
      throw new TypeError(`Parameter index out of boundary: ${index}. Max is ${this.maxParameters}`);
    }
    let parameter = this._parameters[index];
    if (!parameter) {
      parameter = new Parameter(this, index);
      this._parameters[index] = parameter;
    }
    return parameter;
  }

  parameters(): Array<Parameter<Method<P>>> {
    if (!this._cachedParameters) {
      this._cachedParameters = this._parameters.filter(p => p.hasInitializer() || p.hasInterceptor());
    }
    return this._cachedParameters;
  }

  hasParameters(): boolean {
    return this.parameters().length > 0;
  }

  get paramtypes(): Array<any> {
    return this.getMetadata('design:paramtypes');
  }

  get returntype(): any {
    return this.getMetadata('design:returntype');
  }
}
