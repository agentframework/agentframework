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

import { Interceptor } from '../../Interfaces/Interceptor';
import { Invocation } from '../../Interfaces/Invocation';
import { MethodParameterInvocation } from './MethodParameterInvocation';
import { ChainFactory } from '../ChainFactory';
import { PropertyInfo } from '../../Interfaces/PropertyInfo';
// import { define } from '../../Helpers/Prototype';
import { HasInterceptor } from '../../Helpers/CustomInterceptor';
import { remember } from '../../Decorators/remember';

/**
 let MongoDB = class MongoDB {
  constructor(user, conn) {
    this.user = user;
    if (conn) {
      this.connection = conn;
    }
  }
 };
 __decorate([
   lib_1.decorateClassField(new InjectAttribute_1.InjectAttribute()),
   __metadata("design:type", Database)
 ], MongoDB.prototype, "database", void 0);
 MongoDB = __decorate([
   lib_1.agent(),
   __param(1, lib_1.decorateParameter(new InjectAttribute_1.InjectAttribute())),
   __metadata("design:paramtypes", [String, Connection])
 ], MongoDB);

 SO, we don't know the parameters type when decorate agent or decorate parameter

 */
export class ParameterInterceptor implements Interceptor {
  constructor(readonly parent: PropertyInfo) {}

  /**
   * Build or get invocation
   */
  @remember()
  get invocations(): Map<number, Invocation> | undefined {
    const invocations = new Map<number, Invocation>();
    const parameters = this.parent.getParameters();
    for (const parameter of parameters) {
      const idx = parameter.index;
      const interceptors = parameter.findOwnAttributes(HasInterceptor);
      if (interceptors.length) {
        const origin = new MethodParameterInvocation(parameter);
        invocations.set(idx, ChainFactory.chainInterceptorAttributes(origin, interceptors));
      }
    }
    return invocations.size ? invocations : undefined;
  }

  intercept(target: Invocation, params: Array<any>, receiver: any): any {
    const invocations = this.invocations;
    if (invocations) {
      // convert params into array to make params modifiable
      const parameters = Array.prototype.slice.call(params, 0);
      for (const [idx, invocation] of invocations.entries()) {
        parameters[idx] = invocation.invoke(params, receiver);
      }
      return target.invoke(parameters, receiver);
    }
    return target.invoke(params, receiver);
  }
}
