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

/*@__PURE__*/
export function __decorate(
  decorators: Function[],
  target: object | Function,
  targetKey: string | symbol,
  desc: PropertyDescriptor | undefined | null /* field=undefined. method,getter,setter = null*/
): any {
  if (desc === null) {
    desc = Reflect.getOwnPropertyDescriptor(target, targetKey);
  }
  let modified = desc;
  for (let i = decorators.length - 1; i >= 0; i--) {
    modified = decorators[i](target, targetKey, modified || desc);
  }
  if (modified) {
    Reflect.defineProperty(target, targetKey, modified);
  }
}
