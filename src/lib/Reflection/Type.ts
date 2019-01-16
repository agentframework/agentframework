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

import { Constructor } from '../Compiler/Constructor';
import { Method } from './Method';
import { Property } from './Property';
import { PropertyFilter, PropertyFilters } from './PropertyFilters';
import { AgentFeatures } from './AgentFeatures';
import { Types } from '../Internal/Cache';

/**
 * Reflection information for user class
 *
 * A class is a Function. So Class extends from Method
 */
export class Type extends Method<null> {
  private readonly _prototype: object;
  private readonly _properties: Map<PropertyKey, Property>;

  constructor(prototype: Object) {
    super(null, prototype.constructor.length);
    this._prototype = prototype;
    this._properties = new Map<PropertyKey, Property>();
  }

  static for(prototype: Object): Type {
    let found = Types.get(prototype);
    if (!found) {
      found = new Type(prototype);
      Types.set(prototype, found);
    }
    return found;
  }

  /**
   * Return the constructor of reflecting class
   */
  get type(): Constructor<any> {
    return this._prototype.constructor as Constructor<any>;
  }

  /**
   * Return the prototype of reflecting class
   */
  get prototype(): object {
    return this._prototype;
  }

  /**
   * Add the metadata
   */
  addMetadata(key: string, value: any) {
    // for class
    super.addMetadata(key, value);
    // apply class method parameter type into parameter metadata
    if (key === 'design:paramtypes' && value && value.length) {
      const types = value as Array<any>;
      for (let idx = types.length - 1; idx >= 0; idx--) {
        this.parameter(idx).addMetadata('design:type', types[idx]);
      }
    }
  }

  /**
   * Return property info for specified property key
   *
   * @param {string | Symbol | number} key
   * @param {PropertyDescriptor} descriptor
   * @returns {Property}
   */
  property(key: PropertyKey, descriptor?: PropertyDescriptor): Property {
    if (!this._properties.has(key)) {
      descriptor = descriptor || Object.getOwnPropertyDescriptor(this._prototype, key);
      this._properties.set(key, new Property(this, key, descriptor));
    }
    return this._properties.get(key)!;
  }

  /**
   * Return all properties
   *
   * @returns {IterableIterator<Property>}
   */
  properties(): IterableIterator<Property> {
    return this._properties.values();
  }

  /**
   * Return true if contains the giving agent feature
   *
   * @param feature
   */
  hasFeatures(feature: AgentFeatures): boolean {
    return this.findProperties(PropertyFilters.FilterFeatures, feature).length > 0;
  }

  /**
   * Returns a filtered array of Property objects of this prototype.
   *
   * @param {PropertyFilter} filter
   * @param filterCriteria
   * @returns {Property[]}
   */
  findOwnProperties(filter: PropertyFilter, filterCriteria?: any): Map<PropertyKey, Property> {
    const properties = new Map<PropertyKey, Property>();
    for (const [key, property] of this._properties.entries()) {
      if (filter(property, filterCriteria)) {
        properties.set(key, property);
      }
    }
    return properties;
  }

  /**
   * Returns a filtered array of Property objects for all prototype in prototype chain.
   *
   * @param {PropertyFilter} filter
   * @param filterCriteria
   * @returns {Property[]}
   */
  findProperties(filter: PropertyFilter, filterCriteria?: any): Array<[Type, Map<PropertyKey, Property>]> {
    const layers: Array<[Type, Map<PropertyKey, Property>]> = [];
    for (const type of this.findPrototypes()) {
      const properties = type.findOwnProperties(filter, filterCriteria);
      if (properties.size) {
        layers.push([type, properties]);
      }
    }
    return layers;
  }

  /**
   * Return prototype array for current type - deep first [base of base, base, this]
   *
   * @constructor
   */
  findPrototypes(): Array<Type> {
    let list = [],
      p = this._prototype;
    while (p) {
      (p = Object.getPrototypeOf(p)) && list.unshift(Type.for(p));
    }
    list.push(this);
    return list;
  }
}
