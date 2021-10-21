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
import { GetOwnPropertyAnnotation, Property } from '../../../dependencies/core';
import { Once } from '../Decorators/Once/Once';
import { DESIGN_PARAMTYPES, DESIGN_RETURNTYPE, DESIGN_TYPE } from '../WellKnown';

// import { OnDemandPropertyValueInfo } from './OnDemandPropertyValueInfo';
// import { OnDemandPropertyGetterInfo } from './OnDemandPropertyGetterInfo';
// import { OnDemandPropertySetterInfo } from './OnDemandPropertySetterInfo';
/**
 * Property
 *
 * kind = MemberKinds.Prosperty + (Method | Field | Getter | Setter)
 *
 */
export class OnDemandPropertyInfo extends OnDemandMemberInfo<Property> implements PropertyInfo, MemberInfo {
  /**
   * cached parameter info
   */
  protected readonly parameters = new Map<number, OnDemandParameterInfo>();

  protected getAnnotation(): Property | undefined {
    return GetOwnPropertyAnnotation(this.target, this.key);
  }

  protected getName(): string {
    return this.key.toString();
  }

  /**
   * Returns descriptor of this property. undefined if this is a field
   */
  get descriptor(): PropertyDescriptor | undefined {
    const annotation = this.annotation;
    return annotation && annotation.descriptor;
  }

  protected getKind(): number {
    if (this.target === this.declaringType) {
      return MemberKinds.StaticProperty;
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

  protected getType(): Function | undefined {
    if (this.hasOwnMetadata(DESIGN_RETURNTYPE)) {
      return this.getOwnMetadata(DESIGN_RETURNTYPE);
    } else {
      return this.getOwnMetadata(DESIGN_TYPE);
    }
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
   * Return true if interceptor annotated on this or parameter
   */
  hasInterceptor(): boolean {
    const annotation = this.annotation;
    if (!annotation) {
      return false;
    }
    // check property
    if (this.getOwnInterceptors().length) {
      return true;
    }
    // check parameter by using OnDemandParameterInfo
    const parameters = this.getParameters();
    for (const parameter of parameters) {
      if (parameter.getOwnInterceptors().length) {
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
   * Returns true if this property contains annotated parameters
   */
  hasParameter(): boolean {
    const annotation = this.annotation;
    if (annotation && annotation.parameters && annotation.parameters.size) {
      return true;
    }
    return false;
  }

  /**
   * Returns annotated parameter on index; undefined if not found
   */
  getParameter(index: number): ParameterInfo | undefined {
    const annotation = this.annotation;
    if (annotation && annotation.parameters && annotation.parameters.has(index)) {
      return this.parameter(index);
    }
    return;
  }

  /**
   * Returns type of the parameters implementation
   */
  protected getParameterTypes(): ReadonlyArray<any> | undefined {
    return this.getOwnMetadata(DESIGN_PARAMTYPES);
  }

  /**
   * Returns type of the parameters
   */
  get parameterTypes(): ReadonlyArray<any> | undefined {
    return Once(this, 'parameterTypes', this.getParameterTypes());
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
}
