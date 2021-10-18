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
import { MemberKinds } from './MemberKinds';
import { PropertyInfo } from './PropertyInfo';
import { ParameterInfo } from './ParameterInfo';
import { MemberInfo } from './MemberInfo';
import { Attribute } from '../Attribute';
import { Property } from '../../../dependencies/core';
import { AddAttributeToProperty } from '../../../dependencies/core';

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
  protected readonly parameters = new Map<number, OnDemandParameterInfo>();

  get annotation(): Property | undefined {
    return this.propertyAnnotationOrUndefined;
  }

  get version(): number {
    // property info version + parameter version
    let version = this.annotation ? this.annotation.version : 0;
    for (const p of this.parameters.values()) {
      version += p.version;
    }
    return version;
  }

  /**
   * Returns descriptor of this property. undefined if this is a field
   */
  get descriptor(): PropertyDescriptor | undefined {
    // return Reflect.getOwnPropertyDescriptor(this.declaringType.prototype, this.key);
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
  }

  get kind(): number {
    if ('function' === typeof this.target) {
      return MemberKinds.Static | MemberKinds.Property;
    }
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
    return MemberKinds.Property;
  }

  get type(): Function | undefined {
    const type = this.getOwnMetadata('design:type');
    if (type && type.prototype === Function.prototype && this.descriptor) {
      return this.getOwnMetadata('design:returntype');
    }
    return type;
  }

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

  /**
   * Return true if annotated any interceptor on this or parameter
   */
  hasInterceptor(): boolean {
    const annotation = this.annotation;
    if (!annotation) {
      return false;
    }
    // check property
    if (this.hasOwnInterceptor()) {
      return true;
    }
    // check parameter by using OnDemandParameterInfo
    const params = this.getParameters();
    for (const p of params) {
      if (p.hasOwnInterceptor()) {
        return true;
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
  parameter(index: number): ParameterInfo {
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
  getParameterTypes(): ReadonlyArray<any> | undefined {
    return this.getOwnMetadata('design:paramtypes');
  }

  /**
   * Returns annotated parameters
   */
  getParameters(): ReadonlyArray<ParameterInfo> {
    const params = new Array<ParameterInfo>();
    const annotation = this.annotation;
    if (annotation && annotation.parameters && annotation.parameters.size) {
      const indices: Array<number> = [];
      for (const index of annotation.parameters.keys()) {
        indices.unshift(index);
      }
      for (const index of indices) {
        params.push(this.parameter(index));
      }
    }
    return params;
  }

  addAttribute<A4 extends Attribute>(attribute: A4): void {
    AddAttributeToProperty(attribute, this.target, this.key);
  }
}
