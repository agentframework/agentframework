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

import { Property } from '../../../dependencies/core';
import { MemberInfo } from './MemberInfo';
import { ParameterInfo } from './ParameterInfo';

export interface PropertyInfo extends MemberInfo {
  /**
   * Property key
   */
  readonly key: string | symbol;

  /**
   * get annotation
   */
  readonly annotation: Property | undefined;

  /**
   * Get origin property descriptor
   */
  readonly descriptor: PropertyDescriptor | undefined;

  /**
   * Get parameter types
   */
  readonly parameterTypes: ReadonlyArray<any> | undefined;

  /**
   * Return true if contains any interceptor
   *
   * Note: this flags is very important to improve the performance, only proxy the intercepted properties
   */
  readonly intercepted: boolean;

  /**
   * Returns parameter by key (create if not exist)
   */
  parameter(index: number): ParameterInfo;

  /**
   * Returns true if this property contains annotated parameters
   */
  hasParameter(): boolean;

  /**
   * Returns parameter of giving index. undefined if not annotated
   */
  getParameter(index: number): ParameterInfo | undefined;

  /**
   * Get all annotated parameters
   */
  getParameters(): ReadonlyArray<ParameterInfo>;

  /**
   * Return true if contains any interceptor
   *
   * Note: this flags is very important to improve the performance, only proxy the intercepted properties
   */
  hasInterceptor(): boolean;

  // /**
  //  * Return the value member (create a new one if not been created before)
  //  */
  // readonly value: MemberInfo;
  //
  // /**
  //  * Return the getter member (create a new one if not been created before)
  //  */
  // readonly getter: MemberInfo;
  //
  // /**
  //  * Return the setter member (create a new one if not been created before)
  //  */
  // readonly setter: MemberInfo;
}
