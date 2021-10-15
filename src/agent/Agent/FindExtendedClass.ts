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

/**
 * Return extended class between specified type, return [] if no match
 */
export function FindExtendedClass(target: Function, receiver: Function): Array<Function> {
  const targetPrototype = target.prototype;
  let basePrototype: object | null | undefined = receiver.prototype;
  const found: Array<Function> = [];
  while (basePrototype) {
    found.unshift(basePrototype.constructor);
    // getPrototypeOf can be intercept with Proxy. so we need add a guard here to prevent outside attack.
    basePrototype = Reflect.getPrototypeOf(basePrototype);
    if (basePrototype === targetPrototype) {
      return found;
    }
  }
  return [];
}
