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
import { PropertyAnnotation } from '../Annotation/Annotation';
import { MemberKinds } from '../Interfaces/MemberKinds';
import { Wisdom } from '../Wisdom';
import { TypeInfo } from '../Interfaces/TypeInfo';
import { AbstractConstructor } from '../Constructor';
import { PropertyInfo } from '../Interfaces/PropertyInfo';
import { Filter } from '../Interfaces/Filter';
import { Annotator } from '../Annotation/Annotator';
import { Attribute } from '../Interfaces/Attribute';
import { AddAttributeToClass } from '../Annotation/AddAttribute';

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
   * Get TypeInfo from constructor
   */
  static get(target: Function): OnDemandTypeInfo {
    // make sure only create typeinfo for user classes
    const type = Wisdom.GetType(target) || target;
    let info = Wisdom.GetTypeInfo(type);
    if (!info) {
      info = new OnDemandTypeInfo(type);
      Wisdom.RememberTypeInfo(type, info);
    }
    return info;
  }

  /**
   *
   */
  protected properties: Map<PropertyKey, OnDemandPropertyInfo> | undefined;

  // only allow create using factory method
  // make type as a property called constructor
  private constructor(declaringType: Function) {
    super(declaringType, 'constructor');
  }

  get type(): AbstractConstructor<any> {
    return this.declaringType;
  }

  get name(): string {
    return this.declaringType.name;
  }

  get kind(): MemberKinds.Class {
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
  protected get base(): OnDemandTypeInfo | undefined {
    const base = Reflect.getPrototypeOf(this.type.prototype);
    // ignore object as base type
    if (!base || base.constructor === Object || Wisdom.IsAgent(base.constructor)) {
      // stop if agent, because previous agent already
      return;
      // return cache(this, 'base', undefined);
    }
    return OnDemandTypeInfo.get(base.constructor);
    // return cache(this, 'base', TypeInfo.get(base.constructor));
  }

  /**
   * Returns prototypes
   *
   * @cache
   */
  protected get types(): Array<OnDemandTypeInfo> {
    // this can cache because it never changes
    const prototypes: Array<OnDemandTypeInfo> = [];

    /* eslint-disable-next-line @typescript-eslint/no-this-alias */
    let current: OnDemandTypeInfo | undefined = this;
    do {
      prototypes.push(current);
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
    if (!this.properties) {
      this.properties = new Map<PropertyKey, OnDemandPropertyInfo>();
    }
    let propertyInfo = this.properties.get(key);
    if (!propertyInfo) {
      propertyInfo = new OnDemandPropertyInfo(this.declaringType, key);
      this.properties.set(key, propertyInfo);
    }
    return propertyInfo;
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
    // const descriptor = Reflect.getOwnPropertyDescriptor(this.typeAnnotation, key);
    if (descriptor) {
      return this.property(key);
    }
    return;
  }

  /**
   * Get annotated property in prototypes, return undefined if not found
   */
  getProperty(key: string | symbol): PropertyInfo | undefined {
    // const annotation = this.typeAnnotationOrUndefined;
    // if (!annotation) {
    //   return;
    // }
    // const meta: PropertyAnnotation | undefined = Reflect.get(annotation, key);
    const propertyAnnotation: PropertyAnnotation | undefined = Reflect.get(this.typeAnnotation, key);
    if (propertyAnnotation) {
      if (propertyAnnotation.type === this.declaringType) {
        return this.getOwnProperty(key);
      } else {
        return OnDemandTypeInfo.get(propertyAnnotation.type).getOwnProperty(key);
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
    AddAttributeToClass(attribute, this.declaringType);
  }

  /**
   * Get annotation store object
   */
  protected get typeAnnotation(): object {
    // console.log('an', a++);
    return Annotator.type(this.declaringType);
    // return cache(this, 'typeAnnotation', Annotator.get(this.declaringType));
  }

  /**
   * Get annotation store object or undefined
   */
  protected get typeAnnotationOrUndefined(): object | undefined {
    return Wisdom.GetAnnotation(this.declaringType);
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