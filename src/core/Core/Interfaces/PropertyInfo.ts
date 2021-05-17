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

// import { AgentFeatures } from './AgentFeatures';
import { MemberInfo } from './MemberInfo';
import { ParameterInfo } from './ParameterInfo';

export interface PropertyInfo extends MemberInfo {
  /**
   * Get property descriptor for current property
   */
  readonly descriptor: PropertyDescriptor | undefined;

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

  /**
   * Returns parameter by key (create if not exist)
   */
  parameter(index: number): ParameterInfo;

  /**
   * Returns parameter of giving index. undefined if not annotated
   */
  getParameter(index: number): ParameterInfo | undefined;

  /**
   * Returns type of the parameters
   */
  getParameterTypes(): Array<any> | undefined;

  /**
   * Get all annotated parameters
   */
  getParameters(): Array<ParameterInfo>;

  // /**
  //  * Return true if any parameter contains interceptor
  //  */
  // hasParameterInterceptor(): boolean;
  // /**
  //  * Returns true if any attribute decorated on field, method, getter or setter
  //  */
  // hasAttribute<A1 extends Attribute>(type?: AbstractConstructor<A1>): boolean;

  // /**
  //  * Returns a decorated attribute on field, method, getter or setter
  //  */
  // getAttribute<A2 extends Attribute>(type: AbstractConstructor<A2>): A2 | undefined;

  // /**
  //  * Returns all decorated attributes on field, method, getter or setter
  //  */
  // getAttributes<A3 extends Attribute>(type?: AbstractConstructor<A3>): Array<A3>;

  //
  // /**
  //  * Find attribute using filter function and filter criteria
  //  */
  // findAttributes<A5 extends Attribute>(filter: Filter<Attribute>, filterCriteria?: any): Array<A5>;

  /**
   * Return true if contains any interceptor
   *
   * Note: this flags is very important to improve the performance, only proxy the intercepted properties
   */
  hasInterceptor(): boolean;
}
