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

import { Invocation } from './Interfaces/Invocation';
import { Annotation, PropertyAnnotation } from './Annotation/Annotation';

export class AgentFramework {
  // key: Proxy | Agent Constructor | Domain Agent Constructor, value: Original Constructor
  readonly types = new WeakMap<Function, Function>();

  // key: class, prototype; value: annotation
  readonly annotations = new WeakMap<Function, any>();

  // cache
  // key: class prototype; value: Reflector type
  readonly infos = new WeakMap<Function, Function>();

  // cache
  // key: function; value: Invocation
  readonly functionInvocations = new WeakMap<Function, Invocation>();

  // submodule
  // key: any; value: any
  readonly registry = new Map<string, any>();

  // submodule
  // key: string; value: symbol
  readonly symbols = new Map<string, symbol>();

  constructor() {
    // ===============================================================================
    // if one day the browser implemented Reflect.metadata. We will reflector all
    // code related to metadata data in order to have a better performance.
    // ===============================================================================
    const original: Function | undefined = Reflect['metadata'];
    Reflect['metadata'] = (key: string, value: any) => {
      return (target: Function | object, property?: string | symbol, descriptor?: PropertyDescriptor) => {
        //
        // E.g.
        //
        // Function + undefined     = Constructor
        // Object   + PropertyKey   = Class member
        // Function + PropertyKey   = Class static member
        //
        const type = typeof target === 'function' ? target : target.constructor;
        const targetKey = typeof property === 'undefined' ? 'constructor' : property;
        const typeAnnotation = this.GetOrCreateAnnotation(type);
        const annotation = this.GetPropertyAnnotation(typeAnnotation, type, targetKey, descriptor);
        annotation.set(key, value);
        /* istanbul ignore next */
        return original && Reflect.apply(original, Reflect, [key, value])(target, property, descriptor);
      };
    };
  }

  /**
   * Get annotation
   */
  GetAnnotation(type: Function): Annotation | undefined {
    return this.annotations.get(type);
  }

  /**
   * Get or create annotation
   */
  GetOrCreateAnnotation(type: Function): Annotation {
    const originType = type;
    const exists = this.GetAnnotation(originType);
    if (exists) {
      return exists;
    }
    // check parent and build object prototype chain
    const prototype = Reflect.getPrototypeOf(originType.prototype);
    const annotation = Object.create(prototype && this.GetOrCreateAnnotation(prototype.constructor));
    this.annotations.set(type, annotation);
    return annotation;
  }

  /**
   * get metadata for type property
   */
  GetPropertyAnnotation(
    annotation: Annotation,
    type: Function,
    key: string | symbol,
    descriptor?: PropertyDescriptor
  ): PropertyAnnotation {
    const annotationProperty = Reflect.getOwnPropertyDescriptor(annotation, key);
    let value: PropertyAnnotation;
    if (annotationProperty) {
      value = annotationProperty.value;
      // just in case decorate parameter first and decorate property second
      // if (descriptor && !value.descriptor) {
      //   console.log('d', value);
      //   value.descriptor = descriptor;
      // }
    } else {
      value = new PropertyAnnotation(type, descriptor);
      // make sure this meta is readonly and unable to delete
      Reflect.defineProperty(annotation, key, {
        value,
        enumerable: true
      });
    }
    return value;
  }
}

// AgentFramework Wisdom
export const Wisdom: AgentFramework = Function(
  '_',
  'return this[__=Symbol.for(_.name)]=this[__]||(this[__]=new _())'
)(AgentFramework);

// create metadata for satellites project
export function GetOrCreate<T>(id: string, handler: () => T): T {
  let found = Wisdom.registry.get(id);
  /* istanbul ignore else */
  if (!found) {
    found = handler();
    Wisdom.registry.set(id, found);
  }
  return found;
}

// create symbols for satellites project
// export function GetOrCreateSymbol(id: string): symbol {
//   let found = Wisdom.symbols.get(id);
//   if (!found) {
//     found = Symbol(id);
//     Wisdom.symbols.set(id, found);
//   }
//   return found;
// }

export function GetTypeInfo(type: Function): any {
  return Wisdom.infos.get(type);
}

export function RememberTypeInfo(type: Function, info: any) {
  Wisdom.infos.set(type, info);
}

export function GetFunctionInvocation(type: Function): Invocation | undefined {
  return Wisdom.functionInvocations.get(type);
}

export function SetFunctionInvocation(type: Function, invocation: Invocation) {
  Wisdom.functionInvocations.set(type, invocation);
}

export function RememberType(agent: Function, type: Function): void {
  Wisdom.types.set(agent, type);
}
