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

import { Class } from '../Class';
import { Attribute } from './Attribute';
import { Filter } from './Filter';
import { Design } from './Design';

export interface MemberInfo extends Design {
  /**
   * Returns true if any attribute decorated
   */
  hasOwnAttribute<A1 extends Attribute>(type?: Class<A1>): boolean;

  /**
   * Returns a decorated attribute
   */
  getOwnAttribute<A2 extends Attribute>(type: Class<A2>): A2 | undefined;

  /**
   * Returns all decorated attributes
   */
  getOwnAttributes<A3 extends Attribute>(type?: Class<A3>): Array<A3>;

  /**
   * Add a attribute
   */
  addAttribute<A4 extends Attribute>(attribute: A4): void;

  /**
   * Find attribute using filter function and filter criteria
   */
  findOwnAttributes<A5 extends Attribute>(filter: Filter<Attribute>, filterCriteria?: any): Array<A5>;

  /**
   * Return true if decorated any interceptor
   */
  hasOwnInterceptor(): boolean;
}
