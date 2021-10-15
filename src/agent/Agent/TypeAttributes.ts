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

import { Attribute } from './Attribute';
import { ClassInterceptor, ParameterInterceptor, PropertyInterceptor } from './TypeInterceptors';

/**
 * Attribute applies to class
 */
export interface ClassAttribute extends Attribute {
  beforeDecorate?(target: Function): boolean;
  readonly interceptor?: ClassInterceptor;
}

/**
 *
 */
export interface PropertyAttribute extends Attribute {
  beforeDecorate?(target: object, key: string | symbol): boolean;
  readonly interceptor?: PropertyInterceptor;
}

/**
 * Attribute applies to class parameter
 */
export interface ParameterAttribute extends Attribute {
  beforeDecorate?(target: Function, key: undefined, index: number): boolean;
  readonly interceptor?: ParameterInterceptor;
}

/**
 * Attribute applies to class field
 */
// export interface ClassFieldAttribute extends Attribute, Interceptable {
//   readonly interceptor?: FieldInterceptor;
//   beforeDecorate?(target: object, key: string | symbol): boolean;
// }

/**
 * Attribute applies to class method
 */
// export interface ClassMethodAttribute extends Attribute, Interceptable {
//   readonly interceptor?: MethodInterceptor;
//   beforeDecorate?(target: object, key: string | symbol, descriptor: PropertyDescriptor): boolean;
// }
