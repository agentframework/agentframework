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

import { Wisdom } from '../Wisdom/Wisdom';
import { Attribute } from '../Interfaces/Attribute';
import { Class } from '../Class';
import { MemberInfo } from '../Interfaces/MemberInfo';
import { Filter } from '../Interfaces/Filter';
import { HasInterceptor } from '../Helpers/Interceptor';
import { Annotation, Property } from '../Wisdom/Annotation';
// import { cache } from '../Helpers/Cache';

// let a = 0;
/**
 * Access and store attribute and metadata for reflection
 */
export abstract class OnDemandMemberInfo implements MemberInfo {
  /**
   * Get member kind
   */
  abstract readonly kind: number;

  /**
   * create member
   */
  constructor(readonly target: object | Function, readonly key: string | symbol) {}

  /**
   * Get name
   */
  get name(): string {
    return this.key.toString();
  }

  get declaringType(): Function {
    if (typeof this.target === 'object') {
      return this.target.constructor;
    }
    return this.target;
  }

  /**
   * Get type
   */
  abstract type: Function | undefined;

  /**
   * Get metadata object
   */
  protected abstract readonly annotation: Annotation | undefined;

  // /**
  //  * Return true if annotation exists
  //  */
  // protected abstract readonly annotated: boolean;

  /**
   * Add an attribute
   *
   * @param {Attribute} attribute
   */
  abstract addAttribute<A4 extends Attribute>(attribute: A4): void;

  // /**
  //  * Returns annotation of current property specified by the key; (create if not exists)
  //  */
  // protected get propertyAnnotation(): PropertyAnnotation {
  //   const typeAnnotation = Annotator.type(this.declaringType);
  //   return Annotator.property(typeAnnotation, this.declaringType, this.key);
  //   // return cache(this, 'propertyAnnotation', Annotator.property(this.typeAnnotation, this.declaringType, this.key));
  // }

  /**
   * Returns annotation of current property specified by the key.
   */
  protected get propertyAnnotationOrUndefined(): Property | undefined {
    const annotation = Wisdom.get(this.target);
    if (!annotation) {
      return;
    }
    const property = Reflect.getOwnPropertyDescriptor(annotation, this.key);
    if (!property) {
      return;
    }
    return property.value;
    // return cache(this, 'propertyAnnotationOrUndefined', property.value);
  }

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
          return attributes.some(a => a instanceof type);
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
        const results = attributes.filter(a => a instanceof type);
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
  getOwnAttributes<A3 extends Attribute>(type?: Class<A3>): Array<A3> {
    const annotation = this.annotation;
    if (annotation) {
      const attributes = annotation.attributes;
      if (attributes.length) {
        if (type) {
          return attributes.filter(a => a instanceof type) as Array<A3>;
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
  findOwnAttributes<A5 extends Attribute>(filter: Filter<Attribute>, filterCriteria?: any): Array<A5> {
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
   * Return an array of all the attributes which provide getInitializer method
   *
   * @returns {Array<Attribute>}
   */
  // getInitializers(): Array<IInitializerAttribute> {
  //   if (this.annotated) {
  //     const { attributes } = this.annotation;
  //     if (attributes && attributes.length) {
  //       return attributes.filter(HasInitializer);
  //     }
  //   }
  //   return [];
  // }

  /**
   * Return true if any of the attribute provide getInterceptor method
   *
   * @returns {boolean}
   */
  hasOwnInterceptor(): boolean {
    const annotation = this.annotation;
    if (annotation) {
      const attributes = annotation.attributes;
      if (attributes && attributes.length) {
        return attributes.some(HasInterceptor);
      }
    }
    return false;
  }

  /**
   * Return true if any of the attribute provide getInitializer method
   *
   * @returns {boolean}
   */
  // hasInitializer(): boolean {
  //   return this.getInitializers().length > 0;
  // }

  /**
   * Return true if any initializer or interceptor found
   */
  // hasInvocation(): boolean {
  //   if (this.annotated) {
  //     const { attributes } = this.annotation;
  //     if (attributes && attributes.length) {
  //       return this.hasInterceptor();
  //       // return this.hasInitializer() || this.hasInterceptor();
  //     }
  //   }
  //   return false;
  // }

  // /**
  //  * Return true if have any metadata
  //  *
  //  * @returns {boolean}
  //  */
  // hasOwnMetadata(key?: PropertyKey): boolean {
  //   if (this.annotated) {
  //     const { metadata } = this.annotation;
  //     if (metadata && metadata.size) {
  //       if (key) {
  //         return metadata.has(key);
  //       } else {
  //         return true;
  //       }
  //     }
  //   }
  //   /* istanbul ignore next */
  //   if (Reflect['hasOwnMetadata']) {
  //     if (key) {
  //       return Reflect['hasOwnMetadata'](key, this.declaringType, this.key);
  //     }
  //     if (Reflect['getOwnMetadataKeys']) {
  //       return !!Reflect['getOwnMetadataKeys'](this.declaringType, this.key).length;
  //     }
  //   }
  //   return false;
  // }

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
