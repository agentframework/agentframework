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
import { define } from '../Helpers/Prototype';
import { Wisdom } from './Wisdom';

export function remember(key: string) {
  return (target: object | Function, targetKey: string | symbol, descriptor: any): any => {
    return {
      get() {
        const wisdom = Wisdom.get(Wisdom);
        const id = key + '.' + String(targetKey);
        let value = wisdom.get(id);
        /* istanbul ignore next */
        if (!value) {
          const { get } = descriptor || Reflect.getOwnPropertyDescriptor(target, targetKey);
          wisdom.set(id, (value = Reflect.apply(get, target, [])));
        }
        define(target, targetKey, { value });
        return value;
      },
      configurable: true,
    };
  };
}
