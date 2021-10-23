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

import { AgentFrameworkError } from '../../AgentFrameworkError';
import { Arguments } from '../../Arguments';
import { PropertyInfo } from '../../Reflection/PropertyInfo';
import { Invocation } from '../../Invocation';

/**
 * @ignore
 * @hidden
 */
export class GetterSetterInvocation<T extends PropertyInfo> implements Invocation<T> {
  constructor(readonly design: T, readonly cache: WeakMap<any, any>) {}

  invoke(params: Arguments, receiver: any): any {
    const key = this.design.key;

    // this is setter
    if (receiver == null) {
      throw new AgentFrameworkError('InvalidReceiver');
    }

    if (params.length) {
      // how to know the value of a field before you create that class
      // return the value from prototype is a good choose? NO, it may cause infinite loops
      // note: GetterSetterInvocation is shared across all instance of same type
      this.cache.set(receiver, params[0]);
      return params[0];
    } else {
      // note: can not call receiver[key] here because infinite loop
      if (this.cache.has(receiver)) {
        return this.cache.get(receiver);
      }
      // read value from prototype of declaringType
      const prototype = this.design.declaringType.prototype;
      // console.log('getter', receiver, '----', Reflect.has(prototype, key), '-->', Reflect.get(prototype, key));
      if (Reflect.has(prototype, key)) {
        // console.log('getter', Reflect.get(this.design.declaringType.prototype, this.design.key));
        return Reflect.get(prototype, key);
      }
      return;
    }
  }
}
