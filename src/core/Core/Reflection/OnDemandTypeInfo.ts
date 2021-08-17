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

import { OnDemandPropertyInfo } from './OnDemandPropertyInfo';
import { MemberKinds } from '../Interfaces/MemberKinds';
import { Wisdom } from '../Wisdom/Wisdom';
import { TypeInfo } from '../Interfaces/TypeInfo';
import { PropertyInfo } from '../Interfaces/PropertyInfo';
import { Filter } from '../Interfaces/Filter';
import { Attribute } from '../Interfaces/Attribute';
import { AddAttributeToClass } from '../Wisdom/AddAttribute';
import { GetAgentType, IsAgent } from '../Helpers/AgentHelper';
import { remember } from '../Wisdom/Remember';
import { Property } from '../Wisdom/Annotation';

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

export class TypeInfos {
  /**
   * get types map
   */
  @remember('TypeInfos')
  static get v1() {
    return new Map<Function | object, OnDemandTypeInfo>();
  }
}

/**
 * Reflection information for user class
 *
 * Basically a class is a Function. So Type extends from Method
 **/
export class OnDemandTypeInfo extends OnDemandPropertyInfo implements TypeInfo {
  /**
   * Get TypeInfo from constructor
   */
  static find(target: object | Function): TypeInfo {
    // make sure only create typeinfo for user classes
    const type = GetAgentType(target) || target;
    // return new OnDemandTypeInfo(type);
    const info = TypeInfos.v1.get(type);
    if (info) {
      return info;
    }
    const newInfo = new OnDemandTypeInfo(type);
    TypeInfos.v1.set(type, newInfo);
    return newInfo;
  }

  /**
   * properties cache
   */
  // protected properties: Map<PropertyKey, OnDemandPropertyInfo> | undefined;

  // only allow create using factory method
  // make type as a property called constructor
  private constructor(target: object | Function) {
    super(target, 'constructor');
  }

  get static(): TypeInfo {
    return OnDemandTypeInfo.find(this.declaringType);
  }

  get prototype(): TypeInfo {
    return OnDemandTypeInfo.find(this.declaringType.prototype);
  }

  get type(): Function {
    return this.declaringType;
  }

  get name(): string {
    return this.type.name;
  }

  get kind(): number {
    if (typeof this.target === 'function') {
      return MemberKinds.Static | MemberKinds.Class;
    }
    return MemberKinds.Class;
  }

  get descriptor(): PropertyDescriptor | undefined {
    return Reflect.getOwnPropertyDescriptor(this.declaringType.prototype, this.key);
  }

  /**
   * Returns base type
   *
   * @cache
   */
  get base(): TypeInfo | undefined {
    const base = Reflect.getPrototypeOf(this.target);
    if (!base) {
      return;
    }

    // ignore object as base type
    if (base === Function.prototype || base === Object.prototype || IsAgent(base)) {
      return;
    }

    return OnDemandTypeInfo.find(base);
    // return cache(this, 'base', TypeInfo.get(base.constructor));
  }

  /**
   * Returns prototypes for this type
   *
   * @cache
   */
  protected get types(): Array<TypeInfo> {
    // this can cache because it never changes
    const prototypes: Array<TypeInfo> = [];

    /* eslint-disable-next-line @typescript-eslint/no-this-alias */
    let current: TypeInfo | undefined = this;
    // console.log();
    do {
      prototypes.push(current);
      // console.log(this.target, '=', current.base);
      current = current.base;
    } while (current);
    return prototypes;
    // return cache(this, 'prototypes', prototypes);
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
    // if (!this.properties) {
    //   this.properties = new Map<PropertyKey, OnDemandPropertyInfo>();
    // }
    // let propertyInfo = this.properties.get(key);
    // if (!propertyInfo) {
    //   propertyInfo = new OnDemandPropertyInfo(this.declaringType, key);
    //   this.properties.set(key, propertyInfo);
    // }
    // return propertyInfo;
    return new OnDemandPropertyInfo(this.target, key);
  }

  /**
   * Return true if any properties annotated on this type
   */
  hasOwnProperties(): boolean {
    const annotations = this.typeAnnotationOrUndefined;
    if (!annotations) {
      return false;
    }
    for (const key of Reflect.ownKeys(annotations)) {
      if (key === 'constructor') {
        continue;
      }
      return true;
    }
    return false;
  }

  /**
   * Return all own properties
   */
  getOwnProperties(): Array<PropertyInfo> {
    const properties = new Array<PropertyInfo>();
    const annotations = this.typeAnnotationOrUndefined;
    if (!annotations) {
      return properties;
    }
    for (const key of <Array<string | symbol>>Reflect.ownKeys(annotations)) {
      if (key === 'constructor') {
        continue;
      }
      properties.push(this.property(key));
    }
    return properties;
  }

  /**
   * Get own property, return undefined if not exists
   */
  getOwnProperty(key: string | symbol): PropertyInfo | undefined {
    const annotations = this.typeAnnotationOrUndefined;
    if (!annotations) {
      return;
    }
    const descriptor = Reflect.getOwnPropertyDescriptor(annotations, key);
    if (descriptor) {
      return this.property(key);
    }
    return;
  }

  /**
   * Get annotated property in prototypes, return undefined if not found
   */
  getProperty(key: string | symbol): PropertyInfo | undefined {
    const propertyAnnotation: Property | undefined = Reflect.get(this.typeAnnotation, key);
    if (propertyAnnotation) {
      if (propertyAnnotation.target === this.target) {
        return this.getOwnProperty(key);
      } else {
        return OnDemandTypeInfo.find(propertyAnnotation.target).getOwnProperty(key);
      }
    }
    return;
  }

  /**
   * Returns a filtered array of Property objects of this prototype.
   *
   * @param {Filter<PropertyInfo>} filter
   * @param filterCriteria
   * @returns {Map<PropertyKey, OnDemandPropertyInfo>}
   */
  findOwnProperties(filter: Filter<PropertyInfo>, filterCriteria?: any): Array<PropertyInfo> {
    const properties = new Array<PropertyInfo>();
    for (const property of this.getOwnProperties()) {
      if (filter(property, filterCriteria)) {
        properties.push(property);
      }
    }
    return properties;
  }

  /**
   * Returns a filtered array of Property objects for all prototype in prototype chain - deep first [base of base, base, this]
   *
   * @param {Filter<PropertyInfo>} filter
   * @param filterCriteria
   * @returns {Map<TypeInfo, Array<PropertyInfo>>}
   */
  findProperties(filter: Filter<PropertyInfo>, filterCriteria?: any): Map<TypeInfo, Array<PropertyInfo>> {
    const layers = new Map<TypeInfo, Array<PropertyInfo>>();
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
  findTypes(filter?: Filter<TypeInfo>, filterCriteria?: any): Array<TypeInfo> {
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

  addAttribute<A4 extends Attribute>(attribute: A4): void {
    AddAttributeToClass(attribute, this.target);
  }

  /**
   * Get annotation store object
   */
  protected get typeAnnotation(): object {
    // console.log('an');
    return Wisdom.add(this.target);
    // return cache(this, 'typeAnnotation', Annotator.get(this.declaringType));
  }

  /**
   * Get annotation store object or undefined
   */
  protected get typeAnnotationOrUndefined(): object | undefined {
    return Wisdom.get(this.target);
    // return cache(this, 'typeAnnotationOrUndefined', annotation);
  }

  protected getOwnMetadata(key: string): any | undefined {
    const annotation = this.annotation;
    if (annotation && annotation.has(key)) {
      return annotation.get(key);
    }
    /* istanbul ignore next */
    if (Reflect['getOwnMetadata']) {
      return Reflect['getOwnMetadata'](key, this.declaringType);
    }
    return;
  }
}
