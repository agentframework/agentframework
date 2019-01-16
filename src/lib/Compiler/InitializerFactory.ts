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

import { IInvocation } from '../Core/IInvocation';
import { IAttribute } from '../Core/IAttribute';
import { Parameter } from '../Reflection/Parameter';
import { InitializerInvocation } from './Invocation/InitializerInvocation';
import { FieldInvocation } from './Invocation/FieldInvocation';
import { ParameterInvocation } from './Invocation/ParameterInvocation';
import { Property } from '../Reflection/Property';

/**
 * @ignore
 * @hidden
 */
export class InitializerFactory {
  //
  static createFieldInitializer(
    attributes: Array<IAttribute>,
    target: Function,
    propertyKey: PropertyKey,
    design: Property
  ): IInvocation {
    const invocation = new FieldInvocation(target, propertyKey, design);
    return this.chainInitializerAttributes(invocation, attributes);
  }

  static createParameterInitializer(
    attributes: Array<IAttribute>,
    target: Function,
    design: Parameter<any>
  ): IInvocation {
    const invocation = new ParameterInvocation(target, design);
    return this.chainInitializerAttributes(invocation, attributes);
  }

  static chainInitializerAttributes(origin: IInvocation, attributes: Array<IAttribute>): IInvocation {
    // make invocation chain of interceptors
    for (const attribute of attributes) {
      const initializer = attribute.initializer;
      if (initializer && 'function' === typeof initializer.initialize) {
        origin = new InitializerInvocation(origin, initializer);
      }
    }
    return origin;
  }
}
