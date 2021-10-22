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

import { PropertyInfo } from '../../Reflection/PropertyInfo';
import { ParameterInvocation, PropertyInvocation } from '../../TypeInvocations';
import { PropertyInterceptor } from '../../TypeInterceptors';
import { MethodParameterInvocation } from '../Invocation/MethodParameterInvocation';
import { OnDemandInterceptorFactory } from '../OnDemandInterceptorFactory';
import { Once } from '../../Decorators/Once/Once';

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

 NEW NOTE: Since Typescript ? (i didn't check which version). decorator execute from
 bottom to up. so we can have the metadata in place
 */
export class OnDemandParameterInterceptor implements PropertyInterceptor {
  constructor(readonly design: PropertyInfo) {}

  get interceptor(): PropertyInterceptor | undefined {
    if (this.invocations) {
      return this;
    }
    return;
  }

  /**
   * Build or get invocation
   */
  get invocations(): ReadonlyMap<number, ParameterInvocation> | undefined {
    const invocations = new Map<number, ParameterInvocation>();
    for (const parameter of this.design.getParameters()) {
      const idx = parameter.index;
      const interceptors = parameter.ownInterceptors;
      if (interceptors) {
        const origin = new MethodParameterInvocation(parameter);
        invocations.set(idx, OnDemandInterceptorFactory.addInterceptors(origin, interceptors));
      }
    }
    return Once(this, 'invocations', invocations.size ? invocations : undefined);
  }

  intercept(target: PropertyInvocation, params: Array<any>, receiver: any): any {
    // convert params into array to make params modifiable
    const parameters = Array.prototype.slice.call(params, 0);
    for (const [idx, invocation] of this.invocations!.entries()) {
      parameters[idx] = invocation.invoke(params, receiver);
    }
    return target.invoke(parameters, receiver);
  }
}
