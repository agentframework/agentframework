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

export function Cache<T>(target: object | Function, getterKey: string | symbol, valueFn: () => T): T {
  const ver = Reflect.get(target, 'version');
  const value = valueFn();
  const getter = {
    get() {
      if (ver === Reflect.get(this, 'version')) {
        return value;
      }
      return Cache(this, getterKey, valueFn);
    },
  };
  alter(target, getterKey, getter);
  return value;
}
