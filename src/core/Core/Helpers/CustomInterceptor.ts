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

import { Attribute } from '../Interfaces/Attribute';
import { Interceptor } from '../Interfaces/Interceptor';
import { Interceptors } from '../Knowledge';

/**
 * Set custom interceptor for giving type of attribute
 */
export function SetCustomInterceptor(
  type: Function,
  custom: Function,
  meta?: unknown
): void {
  Interceptors.v1.set(type, [custom, meta]);
}

/**
 * Get custom interceptor
 */
export function GetCustomInterceptor(type: Function): [Function, unknown?] | undefined {
  return Interceptors.v1.get(type);
}

/**
 * Remove custom interceptor
 */
export function RemoveCustomInterceptor(type: Function): void {
  Interceptors.v1.delete(type);
}

/**
 * Get interceptor for giving type of attribute
 */
export function GetInterceptor(attribute: Attribute): Interceptor | undefined {
  const interceptor = attribute.interceptor;
  if (interceptor && 'object' === typeof interceptor && 'function' === typeof interceptor.intercept) {
    return interceptor;
  }
  const found = Interceptors.v1.get(attribute.constructor);
  // console.log('find', attribute.constructor, '===', interceptorType)
  if (found) {
    return Reflect.construct(found[0], [attribute, found[1]]);
  }
  return;
}

/**
 * Return true if giving attribute has interceptor
 */
export function HasInterceptor(attribute: Attribute): boolean {
  // we can not use attribute['interceptor'] because the interceptor maybe a getter field
  // the Reflect.has() will checks the key on all prototypes of the attribute
  if (Reflect.has(attribute, 'interceptor')) {
    return true;
  }
  //console.log('has', attribute.constructor, '===',Reflect.has(attribute, 'interceptor'),'||', Knowledge.interceptors.has(attribute.constructor))
  return Interceptors.v1.has(attribute.constructor);
}
