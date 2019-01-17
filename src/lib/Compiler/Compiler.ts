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

import { IInvocation } from '../Core/IInvocation';
import { Arguments } from './Arguments';

/**
 * Generate custom class
 */
export class Compiler {
  private readonly generated: Function;

  constructor(private target: Function) {
    this.generated = this.target;
  }

  defineFields(fields: Map<PropertyKey, [IInvocation, IInvocation]>, params: Arguments) {
    // invoke all initializers to generate default value bag
    if (fields && fields.size) {
      for (const [key, [origin, initializer]] of fields) {
        Object.defineProperty(this.generated.prototype, key, {
          get: function() {
            Reflect.set(origin, 'agent', this);
            const value = initializer.invoke(params());
            Reflect.defineProperty(this, key, {
              value,
              configurable: true,
              enumerable: true,
              writable: true
            });
            return value;
          },
          set: function(value: any) {
            Reflect.defineProperty(this, key, {
              value,
              configurable: true,
              enumerable: true,
              writable: true
            });
          },
          configurable: true,
          enumerable: true
        });
      }
    }
  }

  defineProperties(properties: Map<PropertyKey, PropertyDescriptor>) {
    if (properties && properties.size) {
      for (const [key, descriptor] of properties) {
        Object.defineProperty(this.generated.prototype, key, descriptor);
      }
    }
  }

  compile(): Function {
    return this.generated;
  }
}
