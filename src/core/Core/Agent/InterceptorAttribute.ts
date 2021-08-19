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
import { ClassInvocation } from '../Interfaces/TypeInvocations';
import { Arguments } from '../Interfaces/Arguments';
import { FindExtendedClass } from '../Helpers/FindExtendedClass';
import { OnDemandClassCompiler } from '../Compiler/OnDemandClassCompiler';
import { PropertyInfo } from '../Interfaces/PropertyInfo';

export class InterceptorAttribute {
  get interceptor() {
    return this;
  }

  intercept(target: ClassInvocation, params: Arguments, receiver: any) {
    const design = target.design;
    const oldTarget = design.declaringType;
    // create agent type
    const newTarget: Function = target.invoke(params, receiver);

    /* istanbul ignore next */
    if (oldTarget === newTarget) {
      // not allow modify user class prototype
      return newTarget;
    }

    const result = design.findProperties((p) => p.hasInterceptor());
    const properties = new Map<PropertyKey, PropertyInfo>();

    if (result.size) {
      for (const infos of result.values()) {
        for (const info of infos) {
          properties.set(info.key, info);
        }
      }
    }

    if (properties.size) {
      // 2. find the proxy class
      const found = FindExtendedClass(oldTarget, newTarget);

      // don't generate property interceptor if no extended class
      // quick check, ignore if keys are been declared
      // ownKeys() >= 1 because constructor is one key always have
      OnDemandClassCompiler.upgrade(found[0], properties, found[0], found[1]);
    }

    return newTarget;
  }
}
