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

export interface Arguments {
  [index: number]: any;
  length: number;
}

export interface Class<T extends object> extends Function {
  readonly prototype: T;
}

/**
 * @internal
 */
export const CONSTRUCTOR = 'constructor';

/**
 * @internal
 */
export const METADATA = 'metadata';

/**
 * @internal
 */
export const NOW = 'now';

/**
 * @internal
 */
export function apply<T extends object>(target: T, key: string | symbol | number, value: object): T {
  Reflect.defineProperty(target, key, value);
  return target;
}

/**
 * @internal
 */
export function mount(impl: typeof Reflect, name: string) {
  return function (this: any, type: any): any {
    const id = Symbol.for(name);
    return impl[id] || impl.construct(type, [impl, id]);
  };
}
