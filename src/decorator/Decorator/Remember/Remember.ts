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

// the memorize can be used on both class getter or static getter
import { DefineValue, GetMemory, SetMemory } from '@agentframework/core.ts';
import { decorateMember } from '../../../agent/Agent/Decorate/decorateMember.ts';
import { PropertyInvocation } from '../../../core/Core/Interception/TypeInvocations.ts';
import { Arguments } from '../../../core/Core/Interception/Arguments.ts';

/**
 * only apply to getter
 */
export function remember(key: string): MethodDecorator {
  return decorateMember({
    interceptor: {
      intercept(target: PropertyInvocation, params: Arguments, receiver: object): unknown {
        const id = key + '.' + target.design.name;
        const memory = GetMemory(id);
        if (memory !== undefined) {
          return memory;
        } else {
          const value = target.invoke(params, receiver);
          SetMemory(id, value);
          return value;
        }
      },
    },
  });
  // return (target: object | Function, targetKey: string | symbol, descriptor: any): any => {
  //   return {
  //     get() {
  //       const receiver = 'function' === typeof target ? target : this;
  //       let value;
  //       // note: bulletproof syntax against tools like "terser"
  //       const knowledge = GetKnowledge();
  //       const id = key + '.' + String(targetKey);
  //       value = knowledge.get(id);
  //       if (!value) {
  //         const { get } = descriptor;
  //         knowledge.set(id, (value = Reflect.apply(get, receiver, [])));
  //       }
  //       set(receiver, targetKey, { value });
  //       return value;
  //     },
  //     configurable: true,
  //   };
  // };
}

export function Remember<T>(key: string, target: object | Function, targetKey: string | symbol, valueFn: () => T): T {
  const id = key + '.' + String(targetKey);
  const memory = GetMemory(id);
  if (memory !== undefined) {
    DefineValue(target, targetKey, memory);
    return memory as T;
  } else {
    const value = valueFn();
    SetMemory(id, value);
    return value;
  }
}
