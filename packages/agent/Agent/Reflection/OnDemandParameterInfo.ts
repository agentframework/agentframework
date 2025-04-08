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

import {
  AddAttributeToConstructorParameter,
  AddAttributeToPropertyParameter,
  Annotation,
} from '../../../../packages/dependencies/core';
import { MemberKinds } from './MemberKinds';
import { ParameterInfo } from './ParameterInfo';
import { PropertyInfo } from './PropertyInfo';
import { Attribute } from '../Attribute';
import { OnDemandMemberInfo } from './OnDemandMemberInfo';
import { CONSTRUCTOR } from '../WellKnown';

/**
 * Parameter
 */
export class OnDemandParameterInfo extends OnDemandMemberInfo implements ParameterInfo {
  constructor(
    target: object | Function,
    readonly key: string | symbol,
    readonly index: number,
    protected readonly parent: PropertyInfo
  ) {
    super(target);
  }

  addAttribute<A4 extends Attribute>(attribute: A4): void {
    // if the attribute provide a getInterceptor, that means this property may need inject
    // we don't call getInterceptor or getInitializer until user new() the agent class.
    if (this.key === CONSTRUCTOR) {
      AddAttributeToConstructorParameter(attribute, this.target, this.index);
    } else {
      AddAttributeToPropertyParameter(attribute, this.target, this.key, this.index);
    }
  }

  protected getAnnotation(): Annotation | undefined {
    const annotation = this.parent.annotation;
    return annotation && annotation.parameters && annotation.parameters.get(this.index);
  }

  protected getName(): string {
    return this.index.toString();
  }

  protected getKind(): number {
    let kind = MemberKinds.Parameter;
    if (this.target === this.declaringType) {
      kind |= MemberKinds.Static;
    }
    if (this.key === 'constructor') {
      kind |= MemberKinds.Class;
    }
    return kind;
  }

  protected getType(): Function | undefined {
    // get metadata from parent property, typescript store this meta in property level
    const params = this.parent.parameterTypes;
    if (Array.isArray(params)) {
      return params[this.index];
    }
    return;
  }
}
