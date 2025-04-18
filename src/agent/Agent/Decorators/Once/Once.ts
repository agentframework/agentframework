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

// the once can be used on both class getter or static getter
import { alter } from '../../Compiler/alter';
import { decorateMember } from '../../Decorate/decorateMember';
import { Arguments } from '../../Arguments';
import { PropertyInvocation } from '../../TypeInvocations';

/**
 * Run getter only once. only apply to getter or static getter
 */
export function once(): MethodDecorator {
  return decorateMember({
    interceptor: {
      intercept(target: PropertyInvocation, params: Arguments, receiver: object): unknown {
        const value = target.invoke(params, receiver);
        if ('undefined' !== typeof value) {
          alter(receiver, target.design.key, { value });
        }
        return value;
      },
    },
  });
  // return (target: object | Function, targetKey: string | symbol, descriptor: any): any => {
  //   return {
  //     get() {
  //       const receiver = 'function' === typeof target ? target : this;
  //       let value;
  //       const { get } = descriptor;
  //       value = Reflect.apply(get, receiver, []);
  //       if ('undefined' !== typeof value) {
  //         set(receiver, targetKey, { value });
  //       }
  //       return value;
  //     },
  //     configurable: true,
  //   };
  // };
}

export function Once<T>(target: object | Function, getterKey: string | symbol, value: T): T {
  if ('undefined' !== typeof value) {
    alter(target, getterKey, { value });
  }
  return value;
}
