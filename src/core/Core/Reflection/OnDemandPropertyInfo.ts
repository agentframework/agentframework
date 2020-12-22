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

import { OnDemandMemberInfo } from './OnDemandMemberInfo';
import { OnDemandParameterInfo } from './OnDemandParameterInfo';
import { MemberKinds } from '../Interfaces/MemberKinds';
import { PropertyInfo } from '../Interfaces/PropertyInfo';
import { HasInterceptor } from '../Helpers/Filters';
import { ParameterInfo } from '../Interfaces/ParameterInfo';
import { MemberInfo } from '../Interfaces/MemberInfo';
import { Attribute } from '../Interfaces/Attribute';
import { AddAttributeToMember } from '../Annotation/AddAttribute';
import { Property } from '../Annotation/Wisdom';

// import { getter } from '../Helpers/Prototype';
// import { OnDemandPropertyValueInfo } from './OnDemandPropertyValueInfo';
// import { OnDemandPropertyGetterInfo } from './OnDemandPropertyGetterInfo';
// import { OnDemandPropertySetterInfo } from './OnDemandPropertySetterInfo';
/**
 * Property
 *
 * kind = MemberKinds.Property + (Method | Field | Getter | Setter)
 *
 */
export class OnDemandPropertyInfo extends OnDemandMemberInfo implements PropertyInfo, MemberInfo {
  // readonly type: Function;
  // readonly property: PropertyKey;
  protected parameters: Map<number, OnDemandParameterInfo> | undefined;

  /**
   * Returns descriptor of this property. undefined if this is a field
   */
  get descriptor(): PropertyDescriptor | undefined {
    let descriptor: PropertyDescriptor | undefined;
    const annotation = this.annotation;
    if (annotation) {
      if (Reflect.has(annotation, 'descriptor')) {
        descriptor = annotation.descriptor;
      } else {
        // descriptor is undefined for virtual property
        descriptor = Reflect.getOwnPropertyDescriptor(this.declaringType.prototype, this.key);
        annotation.descriptor = descriptor;
      }
    }
    return descriptor;
    // return cache(this, 'descriptor', descriptor);
  }

  get kind(): number {
    if (typeof this.target === 'function') {
      return MemberKinds.Static | MemberKinds.Property;
    }
    return MemberKinds.Property;
    // const descriptor = this.descriptor;
    // if (descriptor) {
    //   if (Reflect.has(descriptor, 'value')) {
    //     kind |= MemberKinds.Method;
    //   } else {
    //     if (Reflect.has(descriptor, 'get')) {
    //       kind |= MemberKinds.Getter;
    //     }
    //     if (Reflect.has(descriptor, 'set')) {
    //       kind |= MemberKinds.Setter;
    //     }
    //   }
    // } else {
    //   kind |= MemberKinds.Field;
    // }
    // return kind;
  }

  get type(): Function | undefined {
    //return super.getOwnMetadata('design:returntype') || super.getOwnMetadata('design:type');
    if (this.descriptor) {
      return this.getOwnMetadata('design:returntype');
    }
    return this.getOwnMetadata('design:type');
  }

  protected get annotation(): Property | undefined {
    return this.propertyAnnotationOrUndefined;
    // return cache(this, 'annotation', this.propertyAnnotation);
  }

  // protected get annotated(): boolean {
  //   const result = !!this.propertyAnnotationOrUndefined;
  //   if (result) {
  //     return true;
  //     // return cache(this, 'annotated', true);
  //   }
  //   return false;
  // }

  // get value(): OnDemandPropertyValueInfo {
  //   return getter(this, 'value', new OnDemandPropertyValueInfo(this.declaringType, this.key));
  // }
  //
  // get setter(): OnDemandPropertySetterInfo {
  //   return getter(this, 'setter', new OnDemandPropertySetterInfo(this.declaringType, this.key));
  // }
  //
  // get getter(): OnDemandPropertyGetterInfo {
  //   return getter(this, 'getter', new OnDemandPropertyGetterInfo(this.declaringType, this.key));
  // }

  // /**
  //  * Returns true if any attribute decorated
  //  */
  // hasAttribute<A1 extends Attribute>(type?: AbstractConstructor<A1>): boolean {
  //   // check own
  //   // check value
  //   // check getter
  //   // check setter
  //   throw new Error();
  // }
  //
  // /**
  //  * Returns a decorated attribute
  //  */
  // getAttribute<A2 extends Attribute>(type: AbstractConstructor<A2>): A2 | undefined {
  //   // check own
  //   // check value
  //   // check getter
  //   // check setter
  //   throw new Error();
  // }
  //
  // /**
  //  * Returns all decorated attributes
  //  */
  // getAttributes<A3 extends Attribute>(type?: AbstractConstructor<A3>): Array<A3> {
  //   // check own
  //   // check value
  //   // check getter
  //   // check setter
  //   throw new Error();
  // }

  // /**
  //  * Find attribute using filter function and filter criteria
  //  */
  // findAttributes<A5 extends Attribute>(filter: Filter<Attribute>, filterCriteria?: any): Array<A5> {
  //   throw new Error();
  // }

  /**
   * Return true if annotated any interceptor
   */
  hasInterceptor(): boolean {
    const annotation = this.annotation;
    if (!annotation) {
      return false;
    }
    // check property
    if (annotation.attributes && annotation.attributes.length && annotation.attributes.some(HasInterceptor)) {
      return true;
    }
    // check parameter
    if (annotation.parameters && annotation.parameters.size) {
      for (const parameterAnnotation of annotation.parameters.values()) {
        const attributes = parameterAnnotation.attributes;
        for (const attribute of attributes) {
          if (HasInterceptor(attribute)) {
            return true;
          }
        }
      }
    }
    // check method, getter, setter
    // if (annotation.value && this.value.hasOwnInterceptor()) {
    //   return true;
    // }
    // if (annotation.getter && this.getter.hasOwnInterceptor()) {
    //   return true;
    // }
    // if (annotation.setter && this.setter.hasOwnInterceptor()) {
    //   return true;
    // }
    return false;
  }

  /**
   * Returns a parameter on index
   */
  parameter(index: number): OnDemandParameterInfo {
    if (!this.parameters) {
      this.parameters = new Map<number, OnDemandParameterInfo>();
    }
    let parameter = this.parameters.get(index);
    if (!parameter) {
      // passing `this` because parameter type metadata been added on property by TypeScript
      // always looking if we can remove this reference from parameter
      parameter = new OnDemandParameterInfo(this.target, this.key, index, this);
      this.parameters.set(index, parameter);
    }
    return parameter;
  }

  /**
   * Returns a parameter on index; undefined if not found
   */
  getParameter(index: number): ParameterInfo | undefined {
    const annotation = this.annotation;
    if (annotation && annotation.parameters && annotation.parameters.has(index)) {
      return this.parameter(index);
    }
    return;
  }

  /**
   * Returns type of the parameters
   */
  getParameterTypes(): Array<any> | undefined {
    return this.getOwnMetadata('design:paramtypes');
  }

  /**
   * Returns annotated parameters
   */
  getParameters(): Array<OnDemandParameterInfo> {
    const params = new Array<OnDemandParameterInfo>();
    const annotation = this.annotation;
    if (annotation && annotation.parameters && annotation.parameters.size) {
      const indices: Array<number> = [];
      for (const index of annotation.parameters.keys()) {
        indices.push(index);
      }
      for (const index of indices.sort()) {
        params.push(this.parameter(index));
      }
    }
    return params;
  }

  addAttribute<A4 extends Attribute>(attribute: A4): void {
    AddAttributeToMember(attribute, this.target, this.key);
  }

  // hasParameterInterceptor(): boolean {
  //   const annotation = this.propertyAnnotationOrUndefined;
  //   if (!annotation) {
  //     return false;
  //   }
  //   if (annotation.parameters && annotation.parameters.size) {
  //     for (const parameterAnnotation of annotation.parameters.values()) {
  //       const attributes = parameterAnnotation.attributes;
  //       for (const attribute of attributes) {
  //         if (HasInterceptor(attribute)) {
  //           return true;
  //         }
  //       }
  //     }
  //   }
  //   return false;
  // }

  // hasParameterInvocation(): boolean {
  //   for (const parameter of this.getOwnParameters()) {
  //     if (parameter.hasInvocation()) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // hasParameterInitializer(): boolean {
  //   for (const parameter of this.getOwnParameters()) {
  //     if (parameter.hasInitializer()) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // hasFeature(features: AgentFeatures): boolean {
  //   if (this.annotated) {
  //     if ((features & AgentFeatures.Metadata) === AgentFeatures.Metadata) {
  //       if (this.hasOwnMetadata()) {
  //         return true;
  //       }
  //     }
  //     if ((features & AgentFeatures.Attribute) === AgentFeatures.Attribute) {
  //       if (this.hasOwnAttribute()) {
  //         return true;
  //       }
  //     }
  //     if ((features & AgentFeatures.Interceptor) === AgentFeatures.Interceptor) {
  //       if (this.hasInterceptor()) {
  //         return true;
  //       }
  //     }
  //     // if ((features & AgentFeatures.Initializer) === AgentFeatures.Initializer) {
  //     //   if (this.hasInitializers()) {
  //     //     return true;
  //     //   }
  //     // }
  //   }
  //   return false;
  // }
}
