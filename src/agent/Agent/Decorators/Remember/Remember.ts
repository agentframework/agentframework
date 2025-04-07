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

import { GetMemory } from '../../../../dependencies/core';
import { alter } from '../../Compiler/alter';
import { decorateMember } from '../../Decorate/decorateMember';
import { PropertyInvocation } from '../../TypeInvocations';
import { Arguments } from '../../Arguments';
/**
 * Decorator: Caches the result of a getter method using a provided key.
 * Can be applied to both instance and static getters.
 */
export function remember(key: string): MethodDecorator {
  return decorateMember({
    interceptor: {
      intercept(target: PropertyInvocation, params: Arguments, receiver: object): unknown {
        const memory = GetMemory();
        const id = key + '.' + target.design.name;

        const cached = memory.get(id);
        if (cached !== undefined) return cached;

        const resolved = target.invoke(params, receiver);
        memory.set(id, resolved);
        return resolved;
      },
    },
  });
}

/**
 * Manually cache and retrieve a value for a property.
 * Will also patch the property with the resolved value.
 */
export function Remember<T>(
  key: string,
  target: object | Function,
  prop: string | symbol,
  compute: () => T
): T {
  const memory = GetMemory();
  const id = key + '.' + String(prop);

  const cached = memory.get(id);
  if (cached !== undefined) {
    alter(target, prop, { value: cached });
    return cached as T;
  }

  const resolved = compute();
  memory.set(id, resolved);
  alter(target, prop, { value: resolved });
  return resolved;
}

