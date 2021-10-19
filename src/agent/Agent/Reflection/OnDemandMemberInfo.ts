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

import { Annotation } from '../../../dependencies/core';
import { Attribute } from '../Attribute';
import { MemberInfo } from './MemberInfo';
import { Filter } from './Filter';
import { Class } from '../Arguments';
import { HasInterceptor } from '../CustomInterceptor';

// import { cache } from '../Helpers/Cache';
// let a = 0;

/**
 * Access and store attribute and metadata for reflection
 */
export abstract class OnDemandMemberInfo implements MemberInfo {
  /**
   * to improve performance
   */
  private interceptorsVersion: number | undefined;
  private interceptors: Array<Attribute> | undefined;

  /**
   * Get member kind
   */
  abstract readonly kind: number;

  /**
   * create member
   */
  constructor(readonly target: object | Function, readonly key: string | symbol) {}

  /**
   * version. 0 means not annotated
   */
  get version(): number {
    return this.annotation ? this.annotation.version : 0;
  }

  /**
   * Get name
   */
  get name(): string {
    return this.key.toString();
  }

  /**
   * Get declaring type
   */
  get declaringType(): Function {
    if ('object' === typeof this.target) {
      return this.target.constructor;
    }
    return this.target;
  }

  /**
   * Get type
   */
  abstract type: Function | undefined;

  /**
   * Get metadata object, undefined if not annotated.
   */
  abstract readonly annotation: Annotation | undefined;

  /**
   * Add an attribute
   *
   * @param {Attribute} attribute
   */
  abstract addAttribute<A4 extends Attribute>(attribute: A4): void;

  // /**
  //  * Add the metadata generated by tsc
  //  *
  //  * @param {string} key
  //  * @param value
  //  */
  // addMetadata(key: string, value: any): void {
  //   Annotator.addMetadata(this.annotation, key, value);
  // }

  /**
   * Return true if this type contains a giving attribute, otherwise false.
   *
   * @param type
   * @returns {boolean}
   */
  hasOwnAttribute<A1 extends Attribute>(type?: Class<A1>): boolean {
    const annotation = this.annotation;
    if (annotation) {
      const attributes = annotation.attributes;
      if (attributes.length) {
        if (type) {
          return attributes.some((a) => a instanceof type);
        } else {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get specified attribute
   */
  getOwnAttribute<A2 extends Attribute>(type: Class<A2>): A2 | undefined {
    const annotation = this.annotation;
    if (annotation) {
      const attributes = annotation.attributes;
      if (attributes.length) {
        const results = attributes.filter((a) => a instanceof type);
        return <A2>results[0];
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
    const annotation = this.annotation;
    if (annotation) {
      const attributes = annotation.attributes;
      if (attributes.length) {
        if (type) {
          return attributes.filter((a) => a instanceof type) as Array<A3>;
        } else {
          return <A3[]>attributes.slice(0);
        }
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
    const annotation = this.annotation;
    const found: A5[] = [];
    if (annotation) {
      const attributes = annotation.attributes;
      if (attributes.length) {
        for (const attribute of attributes) {
          if (filter(attribute, filterCriteria)) {
            found.push(<A5>attribute);
          }
        }
      }
    }
    return found;
  }

  /**
   * Return true if any of the attribute provide getInterceptor method
   *
   * @returns {boolean}
   */
  hasOwnInterceptor(): boolean {
    // TODO: need to improve performance here
    const annotation = this.annotation;
    if (annotation) {
      if (annotation.version !== this.interceptorsVersion) {
        this.interceptors = annotation.attributes.filter(HasInterceptor);
        this.interceptorsVersion = annotation.version;
      }
      if (this.interceptors) {
        return this.interceptors.length > 0;
      }
    }
    return false;
  }

  /**
   * Return an array of all the attributes which provide getter interceptor
   *
   * @returns {Array<Attribute>}
   */
  getOwnInterceptors(): ReadonlyArray<Attribute> {
    // TODO: need to improve performance here
    const annotation = this.annotation;
    if (annotation) {
      if (annotation.version !== this.interceptorsVersion) {
        this.interceptors = annotation.attributes.filter(HasInterceptor);
        this.interceptorsVersion = annotation.version;
      }
      if (this.interceptors) {
        return this.interceptors;
      }
    }
    return [];
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
    return;
  }
}
