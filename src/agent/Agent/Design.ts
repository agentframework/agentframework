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

import { Class } from './Arguments';
import { Filter } from './Reflection/Filter';

export interface Design {
  /**
   * Version
   */
  readonly version: number;

  /**
   * Kind
   */
  readonly kind: number;

  /**
   * Name
   */
  readonly name: string;

  /**
   * Type declaring this member
   */
  readonly declaringType: Function;

  /**
   * Property key
   */
  readonly key: string | symbol;

  /**
   * Property type for this annotation, void = undefined, any = typeof Object
   */
  readonly type: Function | undefined;

  /**
   * Add attribute to current design, and create annotation if not exists
   */
  addAttribute<A4 extends object>(attribute: A4): void;

  /**
   * Returns true if any attribute decorated
   */
  hasAttribute<A1 extends object>(type?: Class<A1>): boolean;

  /**
   * Returns a decorated attribute
   */
  getAttribute<A2 extends object>(type: Class<A2>): A2 | undefined;

  /**
   * Returns all decorated attributes
   */
  getAttributes<A3 extends object>(type?: Class<A3>): ReadonlyArray<A3>;

  /**
   * Find attribute using filter function and filter criteria
   */
  findAttributes<A5 extends object>(filter: Filter<object>, filterCriteria?: any): ReadonlyArray<A5>;
}
