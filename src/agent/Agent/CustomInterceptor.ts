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

import { Interceptor } from './Interceptor';
import { CustomInterceptors } from './Knowledges/CustomInterceptors';

/**
 * Use custom interceptor to overwrite the default attribute interceptor
 * Provide a kind of ability to extend attribute functionality.
 */

/**
 * @public
 * Set custom interceptor for giving type of attribute
 */
export function SetCustomInterceptor(attribute: Function, custom: Function, meta?: unknown): void {
  CustomInterceptors.v1.set(attribute, [custom, meta]);
}

/**
 * @public
 * Get custom interceptor
 */
export function GetCustomInterceptor(attribute: Function): [Function, unknown?] | undefined {
  return CustomInterceptors.v1.get(attribute);
}

/**
 * @public
 * Remove custom interceptor for specified attribute
 */
export function RemoveCustomInterceptor(attribute: Function): void {
  CustomInterceptors.v1.delete(attribute);
}

/**
 * @internal
 * Return true if giving attribute has interceptor
 */
export function HasInterceptor(attribute: object): boolean {
  // we can not use attribute['interceptor'] because the interceptor maybe a getter field
  // the Reflect.has() will check the key on all prototypes of that attribute
  if (Reflect.has(attribute, 'interceptor')) {
    return true;
  }
  //console.log('has', attribute.constructor, '===',Reflect.has(attribute, 'interceptor'),'||', Knowledge.interceptors.has(attribute.constructor))
  return CustomInterceptors.v1.has(attribute.constructor);
}

/**
 * @internal
 * Get interceptor for giving type of attribute
 */
export function GetInterceptor(attribute: object): Interceptor | undefined {
  const found = CustomInterceptors.v1.get(attribute.constructor);
  if (found) {
    // todo: cache custom interceptor
    return Reflect.construct(found[0], [attribute, found[1]]);
  }
  const interceptor = Reflect.get(attribute, 'interceptor');
  if (interceptor && 'object' === typeof interceptor && 'function' === typeof interceptor.intercept) {
    return interceptor;
  }
  return;
}
