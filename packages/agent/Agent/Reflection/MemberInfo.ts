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

import { Annotation } from '../../../../packages/dependencies/core';
import { Class } from '../Arguments';
import { Design } from '../Design';
import { Filter } from './Filter';

export interface MemberInfo extends Design {
  /**
   * get annotation
   */
  readonly annotation: Annotation | undefined;

  /**
   * Return an array of all the attributes
   */
  readonly ownAttributes: ReadonlyArray<object> | undefined;

  /**
   * Returns all decorated attributes with interceptor
   */
  readonly ownInterceptors: ReadonlyArray<object> | undefined;

  /**
   * Add attribute to current design, and create annotation if not exists
   */
  addAttribute<A4 extends object>(attribute: A4): void;

  /**
   * Returns true if any attribute decorated
   */
  hasOwnAttribute<A1 extends object>(type?: Class<A1>): boolean;

  /**
   * Returns a decorated attribute
   */
  getOwnAttribute<A2 extends object>(type: Class<A2>): A2 | undefined;

  /**
   * Returns all decorated attributes
   */
  getOwnAttributes<A3 extends object>(type?: Class<A3>): ReadonlyArray<A3>;

  /**
   * Find attribute using filter function and filter criteria
   */
  findOwnAttributes<A5 extends object>(filter: Filter, filterCriteria?: any): ReadonlyArray<A5>;

  /**
   * Return true if decorated any interceptor
   */
  hasOwnInterceptor(): boolean;

  // /**
  //  * Returns all decorated attributes with interceptor
  //  */
  // getOwnInterceptors(): ReadonlyArray<object>;
}
