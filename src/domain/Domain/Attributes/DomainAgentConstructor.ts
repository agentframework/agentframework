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

import { Arguments, Reflector } from '../../../dependencies/core';;
import { InitializableAttribute } from './InitializableAttribute';

/**
 * introduce agent fields and properties during 1st access
 */
export class OnDemandClassConstructor {
  /**
   * ES6 Proxy Constructor hook
   */
  construct<T extends Function>(target: T, params: Arguments, newTarget: T): any {
    const origin: any = {
      invoke(params: Arguments, receiver: any): any {
        return Reflect.construct(target, params, receiver);
      },
    };
    Reflect.defineProperty(origin, 'design', {
      get() {
        return Reflector(target);
      },
    });
    const attribute = new InitializableAttribute();
    return attribute.intercept(origin, params, newTarget);
  }
}
