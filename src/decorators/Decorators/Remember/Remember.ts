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

import { GetMemory, SetMemory } from '../../../../packages/dependencies/core';
import { decorateMember } from '../../../../packages/agent/Agent/Decorate/decorateMember';
import { PropertyInvocation } from '../../../../packages/agent/Agent/TypeInvocations';
import { Arguments } from '../../../../packages/agent/Agent/Arguments';

/**
 * Decorator: Caches the result of a getter method using a provided key.
 * Can be applied to both instance and static getters.
 */
export function remember(key: string): MethodDecorator {
  return decorateMember({
    interceptor: {
      intercept(target: PropertyInvocation, params: Arguments, receiver: object): unknown {
        const id = key + '.' + target.design.name;

        const cached = GetMemory(id);
        if (cached !== undefined) return cached;

        const resolved = target.invoke(params, receiver);
        SetMemory(id, resolved);
        return resolved;
      },
    },
  });
}

