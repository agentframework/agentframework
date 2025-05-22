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

import { OnDemandPropertyInfo } from './OnDemandPropertyInfo.ts';
import { MemberKinds } from '../MemberKinds.ts';
import {
  AddAttributeToConstructor,
  DefineIfValue,
  GetAnnotation,
  GetConstructorAnnotation,
  GetPropertyAnnotation,
  Property,
  Type,
} from '../../Meta';
import { TypeInfo } from '../TypeInfo.ts';
import { PropertyInfo } from '../PropertyInfo.ts';
import { Filter } from '../Filter.ts';
import { CONSTRUCTOR } from '../../WellKnown.ts';
import { TypeInfos } from '../TypeInfoKnowledge.ts';

// class TypeIteratorResult {
//   constructor(readonly done: boolean, readonly value: any) {}
// }
//
// class TypeIterableIterator {
//   // prototype
//   private current?: TypeInfo;
//
//   constructor(type: TypeInfo) {
//     this.current = type;
//   }
//
//   [Symbol.iterator](): IterableIterator<TypeInfo> {
//     return this;
//   }
//
//   next(): IteratorResult<TypeInfo> {
//     const current = this.current;
//     if (current) {
//       // move to next item for next time
//       this.current = current.base;
//       return new TypeIteratorResult(false, current);
//     }
//     return new TypeIteratorResult(true, undefined);
//   }
// }

/**
 * Reflection information for user class
 *
 * Basically a class is a Function. So Type extends from Method
 **/
export class OnDemandTypeInfo extends OnDemandPropertyInfo implements TypeInfo {
  /**
   * cached property info
   */
  protected readonly properties = new Map<PropertyKey, OnDemandPropertyInfo>();

  protected constructor(target: object | Function) {
    super(target, CONSTRUCTOR);
  }

  /**
   * Get TypeInfo from constructor
   */
  static from(target: object | Function): TypeInfo {
    const info = TypeInfos.v2.get(target);
    if (info) {
      return info;
    }
    // make type as a property called "constructor"
    const newInfo = new OnDemandTypeInfo(target);
    TypeInfos.v2.set(target, newInfo);
    return newInfo;
  }

  get static(): TypeInfo {
    return OnDemandTypeInfo.from(this.declaringType);
  }

  /**
   * Access class annotation info
   */
  get prototype(): TypeInfo {
    return DefineIfValue(this, 'prototype', OnDemandTypeInfo.from(this.declaringType.prototype));
  }

  protected getType(): Function | undefined {
    return this.declaringType;
  }

  protected getName(): string {
    return this.declaringType.name;
  }

  protected getKind(): number {
    if (this.target === this.declaringType) {
      return MemberKinds.StaticClass;
    }
    return MemberKinds.Class;
  }

  protected getBase(): TypeInfo | null | undefined {
    const base = Reflect.getPrototypeOf(this.target);
    let result;
    if (!base) {
      result = null;
    }
    // ignore object as base type
    else if (base === Function.prototype || base === Object.prototype) {
      result = null;
    } else {
      result = OnDemandTypeInfo.from(base);
    }
    return result;
  }

  protected getTypes(): ReadonlyArray<TypeInfo> {
    // this can cache because it never changes
    const prototypes: Array<TypeInfo> = [];
    /* eslint-disable-next-line @typescript-eslint/no-this-alias */
    let current: TypeInfo | null | undefined = this;
    // console.log();
    do {
      prototypes.unshift(current);
      // console.log(this.target, '=', current.base);
      current = current.base;
    } while (current);
    return prototypes;
  }

  protected getAnnotation(): Property | undefined {
    return GetConstructorAnnotation(this.target);
  }

  // protected getAnnotation(): Property | undefined {
  //   return GetAnnotation(this.target);
  // }

  protected getTypeAnnotation(): Type | undefined {
    return GetAnnotation(this.target);
  }

  get annotation(): Property | undefined {
    return DefineIfValue(this, 'annotation', this.getAnnotation());
  }

  /**
   * @sealed
   * Get metadata object, undefined if not annotated.
   */
  get typeAnnotation(): Type | undefined {
    return DefineIfValue(this, 'typeAnnotation', this.getTypeAnnotation());
  }

  /**
   * version. 0 means not annotated
   */
  get version(): number {
    const annotation = this.typeAnnotation;
    return annotation ? annotation.v : 0;
  }

  /**
   * Constructor always have property descriptor
   */
  get descriptor(): PropertyDescriptor | undefined {
    return Reflect.getOwnPropertyDescriptor(this.declaringType.prototype, this.key);
  }

  /**
   * Returns base type
   *
   * @cache
   */
  get base(): TypeInfo | null | undefined {
    return DefineIfValue(this, 'base', this.getBase());
  }

  /**
   * Returns prototypes for this type
   *
   * @returns [base, extended, this]
   * @cache
   */
  get types(): ReadonlyArray<TypeInfo> {
    return DefineIfValue(this, 'types', this.getTypes());
  }

  // /**
  //  * Add the metadata
  //  */
  // addMetadata(key: string, value: any) {
  //   // for class
  //   super.addMetadata(key, value);
  //   // apply class method parameter type into parameter metadata
  //   if (key === 'design:paramtypes' && value && value.length) {
  //     const types = value as Array<any>;
  //     for (let idx = types.length - 1; idx >= 0; idx--) {
  //       try {
  //         this.parameter(idx).addMetadata('design:type', types[idx]);
  //       } catch {
  //         // console.log('ctor', idx, types[idx], this.prototype.constructor);
  //       }
  //     }
  //   }
  // }

  /**
   * Get or create a property for current type
   */
  property(key: string | symbol): OnDemandPropertyInfo {
    let propertyInfo = this.properties.get(key);
    if (!propertyInfo) {
      propertyInfo = new OnDemandPropertyInfo(this.target, key, this);
      this.properties.set(key, propertyInfo);
    }
    return propertyInfo;
  }

  /**
   * Return true if any properties annotated on this type
   */
  hasOwnProperties(): boolean {
    const type = this.typeAnnotation;
    return type !== undefined && type.properties !== undefined;
  }

  /**
   * Get own property, return undefined if not exists
   */
  getOwnProperty(key: string | symbol): PropertyInfo | undefined {
    const type = this.typeAnnotation;
    if (type && type.properties && type.properties.has(key)) {
      return this.property(key);
    }
    return;
  }

  /**
   * Get annotated property in prototypes, return undefined if not found
   */
  getProperty(key: string | symbol): PropertyInfo | undefined {
    const propertyAnnotation: Property | undefined = GetPropertyAnnotation(this.target, key);
    if (propertyAnnotation) {
      if (propertyAnnotation.target === this.target) {
        return this.getOwnProperty(key);
      } else {
        return OnDemandTypeInfo.from(propertyAnnotation.target).getOwnProperty(key);
      }
    }
    return;
  }

  /**
   * Return all own properties
   */
  getOwnProperties(): ReadonlyArray<PropertyInfo> {
    const found = new Array<PropertyInfo>();
    const type = this.typeAnnotation;
    if (type && type.properties) {
      for (const key of type.properties.keys()) {
        found.push(this.property(key));
      }
    }
    return found;
  }

  /**
   * Returns a filtered array of Property objects of this prototype.
   *
   * @param {Filter<PropertyInfo>} filter
   * @param filterCriteria
   * @returns {Map<PropertyKey, OnDemandPropertyInfo>}
   */
  findOwnProperties(filter: Filter<PropertyInfo>, filterCriteria?: any): ReadonlyArray<PropertyInfo> {
    const found = new Array<PropertyInfo>();
    const type = this.typeAnnotation;
    if (type && type.properties) {
      for (const key of type.properties.keys()) {
        const property = this.property(key);
        if (filter(property, filterCriteria)) {
          found.push(property);
        }
      }
    }
    return found;
  }

  /**
   * Returns a filtered array of Property objects for all prototype in prototype chain - deep first [root, base, this]
   *
   * @param {Filter<PropertyInfo>} filter
   * @param filterCriteria
   * @returns {Map<TypeInfo, Array<PropertyInfo>>}
   */
  findProperties(
    filter: Filter<PropertyInfo>,
    filterCriteria?: any,
  ): ReadonlyMap<TypeInfo, ReadonlyArray<PropertyInfo>> {
    const layers = new Map<TypeInfo, ReadonlyArray<PropertyInfo>>();
    for (const type of this.types) {
      const found = type.findOwnProperties(filter, filterCriteria);
      if (found.length) {
        layers.set(type, found);
      }
    }
    return layers;
  }

  /**
   * Find types from prototype chain
   */
  findTypes(filter?: Filter<TypeInfo>, filterCriteria?: any): ReadonlyArray<TypeInfo> {
    if (!filter) {
      return this.types.slice(0);
    }
    const types = new Array<TypeInfo>();
    for (const type of this.types) {
      const found = filter(type, filterCriteria);
      if (found) {
        types.push(type);
      }
    }
    return types;
  }

  addAttribute<A4 extends object>(attribute: A4): void {
    AddAttributeToConstructor(attribute, this.target);
  }
}
