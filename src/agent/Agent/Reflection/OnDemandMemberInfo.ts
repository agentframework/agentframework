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

import { AddAttributeToProperty, Annotation } from '../../../dependencies/core';
import { Attribute } from '../Attribute';
import { MemberInfo } from './MemberInfo';
import { Filter } from './Filter';
import { Class } from '../Arguments';
import { Once } from '../Decorators/Once/Once';
import { HasInterceptor } from '../CustomInterceptor';
import { Cache } from '../Decorators/Cache/Cache';

/**
 * Access and store attribute and metadata for reflection
 */
export abstract class OnDemandMemberInfo<A extends Annotation = Annotation> implements MemberInfo {
  /**
   * create member
   */
  constructor(readonly target: object | Function, readonly key: string | symbol) {}

  /**
   * Get name implementation, can be override by divided class
   */
  protected abstract getName(): string;

  /**
   * @sealed
   * Get name
   */
  get name(): string {
    return Once(this, 'name', this.getName());
  }

  /**
   * Get declaring type implementation, can be override by divided class
   */
  protected getDeclaringType(): Function {
    if ('object' === typeof this.target) {
      return this.target.constructor;
    } else {
      return this.target;
    }
  }

  /**
   * @sealed
   * Get declaring type
   */
  get declaringType(): Function {
    return Once(this, 'declaringType', this.getDeclaringType());
  }

  /**
   * Get member kind implementation, can be override by divided class
   */
  protected abstract getKind(): number;

  /**
   * @sealed
   * Get member kind
   */
  get kind(): number {
    return Once(this, 'kind', this.getKind());
  }

  /**
   * Get metadata object implementation, can be override by divided class
   */
  protected abstract getAnnotation(): A | undefined;

  /**
   * @sealed
   * Get metadata object, undefined if not annotated.
   */
  get annotation(): A | undefined {
    return Once(this, 'annotation', this.getAnnotation());
  }

  /**
   * version. 0 means not annotated
   */
  get version(): number {
    const annotation = this.annotation;
    return annotation ? annotation.version : 0;
  }

  /**
   * Get type implementation, can be override by divided class
   */
  protected abstract getType(): Function | undefined;

  /**
   * Get type
   */
  get type(): Function | undefined {
    return Once(this, 'type', this.getType());
  }

  /**
   * Return an array of all the attributes
   */
  get ownAttributes(): ReadonlyArray<object> | undefined {
    const annotation = this.annotation;
    if (!annotation) {
      return;
    }
    return Cache(this, 'ownAttributes', () => annotation.attributes);
  }

  /**
   * Return an array of all the attributes which provide getter interceptor
   */
  get ownInterceptors(): ReadonlyArray<object> | undefined {
    const annotation = this.annotation;
    if (!annotation || !annotation.attributes.length) {
      return;
    }
    return Cache(this, 'ownInterceptors', () => {
      const interceptors = annotation.attributes.filter(HasInterceptor);
      if (interceptors.length) {
        return interceptors;
      }
      return;
    });
  }

  /**
   * Add an attribute
   *
   * @param {Attribute} attribute
   */
  addAttribute<A4 extends Attribute>(attribute: A4): void {
    AddAttributeToProperty(attribute, this.target, this.key);
  }

  /**
   * Return true if this type contains a giving attribute, otherwise false.
   *
   * @param type
   * @returns {boolean}
   */
  hasOwnAttribute<A1 extends Attribute>(type?: Class<A1>): boolean {
    const attributes = this.ownAttributes;
    if (attributes) {
      if (type) {
        return attributes.some((a) => a instanceof type);
      } else {
        return attributes.length > 0;
      }
    }
    return false;
  }

  /**
   * Get specified attribute
   */
  getOwnAttribute<A2 extends Attribute>(type: Class<A2>): A2 | undefined {
    const attributes = this.ownAttributes;
    if (attributes) {
      for (const attribute of attributes) {
        if (attribute instanceof type) {
          return attribute;
        }
      }
    }
    return;
  }

  /**
   * Return an array of attributes which is instance of giving type
   *
   * @returns {Array<Attribute>}
   */
  getOwnAttributes<A3 extends Attribute>(type?: Class<A3>): ReadonlyArray<A3> {
    const attributes = this.ownAttributes;
    if (attributes) {
      if (type) {
        return attributes.filter((a) => a instanceof type) as Array<A3>;
      } else {
        return <A3[]>attributes.slice(0);
      }
    }
    return [];
  }

  /**
   * Return an array of all the attributes which provide getter interceptor
   *
   * @returns {Array<Attribute>}
   */
  findOwnAttributes<A5 extends Attribute>(filter: Filter<Attribute>, filterCriteria?: any): ReadonlyArray<A5> {
    const attributes = this.ownAttributes;
    if (attributes) {
      return attributes.filter((a) => filter(a, filterCriteria)) as Array<A5>;
    }
    return [];
  }

  /**
   * Return true if any of the attribute provide getInterceptor method
   *
   * @returns {boolean}
   */
  hasOwnInterceptor(): boolean {
    const interceptors = this.ownInterceptors;
    return interceptors !== undefined && interceptors.length > 0;
  }

  // /**
  //  * Return an array of all the attributes which provide getter interceptor
  //  *
  //  * @returns {Array<Attribute>}
  //  */
  // getOwnInterceptors(): ReadonlyArray<object> {
  //   const interceptors = this.ownInterceptors;
  //   if (interceptors) {
  //     return interceptors;
  //   }
  //   return [];
  // }

  protected hasOwnMetadata(key: string): boolean {
    const annotation = this.annotation;
    if (annotation) {
      return annotation.has(key);
    }
    return false;
  }

  /**
   * Read the metadata generated by tsc
   *
   * @param key
   */
  protected getOwnMetadata(key: string): any | undefined {
    // if (this.annotated) {
    const annotation = this.annotation;
    if (annotation && annotation.has(key)) {
      return annotation.get(key);
    }
    // }
    /* istanbul ignore next */
    if (Reflect['getOwnMetadata']) {
      return Reflect['getOwnMetadata'](key, this.declaringType.prototype, this.key);
    }

    // debugger;
    // console.log();
    // console.log('looking for meta', key, ' on', this.target, '.', this.key);
    return;
  }
}
