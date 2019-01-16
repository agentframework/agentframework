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

import { IInvocation } from '../../Core/IInvocation';
import { Type } from '../../Reflection/Type';
import { Reflector } from '../../Reflection/Reflector';

/**
 * @ignore
 * @hidden
 */
export class AgentInvocation implements IInvocation {
  constructor(private readonly _target: Function) {}

  get design(): Type {
    return Reflector(this._target);
  }

  get target(): Function {
    return this._target;
  }

  invoke([target, code, agent]: [Function, string, Object]): any {
    if (target === this.target) {
      return target;
    }
    // cheating v8
    const args = [target, 'Reflect', `return ${code}`];
    return Reflect.construct(Function, args)(this.target, agent);
  }
}
