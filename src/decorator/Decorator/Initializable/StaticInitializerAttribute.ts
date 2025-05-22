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

import { AgentFrameworkError } from '../../../agent/Agent/AgentFrameworkError.ts';
import { TypeInterceptor } from '../../../core/Core/Interception/TypeInterceptors.ts';
import { TypeInvocation } from '../../../core/Core/Interception/TypeInvocations.ts';
import { Arguments } from '../../../core/Core/Interception/Arguments.ts';

export class StaticInitializerAttribute implements TypeInterceptor {
  constructor(readonly key: PropertyKey) {}

  get interceptor() {
    return this;
  }

  intercept(target: TypeInvocation, params: Arguments, receiver: Function): object {
    const declaringType = target.design.declaringType;
    const initializer = Reflect.get(declaringType, this.key, receiver);
    if (initializer) {
      if ('function' !== typeof initializer) {
        throw new AgentFrameworkError('ClassInitializerIsNotFunction');
      }
      return Reflect.apply(initializer, declaringType, arguments);
    } else {
      return target.invoke(params, receiver);
    }
  }
}
