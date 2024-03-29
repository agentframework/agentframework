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

import { PropertyInfo } from './PropertyInfo';
import { Filter } from './Filter';
import { Type } from '../../../dependencies/core';

export interface TypeInfo extends PropertyInfo {
  /**
   * get type annotation
   */
  readonly typeAnnotation: Type | undefined;

  /**
   * Access static annotation info
   */
  readonly static: TypeInfo;

  /**
   * Access class annotation info
   */
  readonly prototype: TypeInfo;

  /**
   * Get base type info
   */
  readonly base: TypeInfo | null | undefined;

  /**
   * Type version. includes all properties
   */
  readonly version: number;

  /**
   * Returns property by key (create if not exist)
   */
  property(key: PropertyKey): PropertyInfo;

  /**
   * Return true if any properties annotated, not include constructor
   */
  hasOwnProperties(): boolean;

  /**
   * Find all annotated properties
   */
  getOwnProperties(): ReadonlyArray<PropertyInfo>;

  /**
   * Find own annotated property by key
   */
  getOwnProperty(key: PropertyKey): PropertyInfo | undefined;

  /**
   * Find annotated property in own properties or prototype properties by key, results: current -> base -> root -> Object
   */
  getProperty(key: PropertyKey): PropertyInfo | undefined;

  /**
   * Find annotated properties
   */
  findOwnProperties(filter: Filter<PropertyInfo>, filterCriteria?: any): ReadonlyArray<PropertyInfo>;

  // /**
  //  * Find intercepted properties
  //  */
  // readonly ownInterceptedProperties: ReadonlyArray<PropertyInfo>;

  /**
   * Find annotated properties from own properties or prototype properties, results: current -> middle -> root -> Object
   */
  findProperties(
    filter: Filter<PropertyInfo>,
    filterCriteria?: any
  ): ReadonlyMap<TypeInfo, ReadonlyArray<PropertyInfo>>;

  /**
   * Find types from prototype chain, results: current -> middle -> root -> Object
   */
  findTypes(filter?: Filter<TypeInfo>, filterCriteria?: any): ReadonlyArray<TypeInfo>;
}
