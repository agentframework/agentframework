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

import { Invocation } from '../Interfaces/Invocation';
import { Annotation, ParameterAnnotation, PropertyAnnotation } from './Annotation';

export class AgentFramework {
  // key: Proxy | Agent Constructor | Domain Agent Constructor, value: Original Constructor
  readonly _types = new WeakMap<Function, Function>();

  // key: class, prototype; value: annotation
  readonly _annotations = new WeakMap<Function, any>();

  // key: class prototype; value: Reflector type
  readonly _infos = new WeakMap<Function, Function>();

  // key: function; value: Invocation
  readonly _functionInvocations = new WeakMap<Function, Invocation>();

  // key: any; value: any
  readonly _registry = new Map<string, any>();

  // key: string; value: symbol
  // private readonly _symbols = new Map<string, symbol>();

  constructor() {
    // ===========================================
    // Reflect.metadata is not released yet
    // ===========================================
    // if one day the browser implemented Reflect.metadata. We will reflector all
    // code related to metadata data in order to have a better performance.
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
        const typeAnnotation = this.type(type);
        const annotation = this.property(typeAnnotation, type, targetKey, descriptor);
        annotation.set(key, value);
        /* istanbul ignore next */
        return original && Reflect.apply(original, Reflect, [key, value])(target, property, descriptor);
      };
    };
  }

  /**
   * get metadata for type
   */
  type(type: Function): Annotation {
    const originType = this.GetType(type) || type;
    const exists = this.GetAnnotation(originType);
    if (exists) {
      return exists;
    }
    // check parent and build object prototype chain
    const prototype = Reflect.getPrototypeOf(originType.prototype);
    const annotations = Object.create(prototype && this.type(prototype.constructor));
    return this.RememberAnnotation(originType, annotations);
  }

  /**
   * get metadata for type property
   */
  property(
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
        enumerable: true,
      });
    }
    return value;
  }

  // value(property: PropertyAnnotation): MemberAnnotation {
  //   return property.value || (property.value = new MemberAnnotation());
  // }
  //
  // getter(property: PropertyAnnotation): MemberAnnotation {
  //   return property.getter || (property.getter = new MemberAnnotation());
  // }
  //
  // setter(property: PropertyAnnotation): MemberAnnotation {
  //   return property.setter || (property.setter = new MemberAnnotation());
  // }

  parameter(
    annotation: PropertyAnnotation,
    target: Function,
    property: PropertyKey,
    index: number
  ): ParameterAnnotation {
    const map = annotation.parameters || (annotation.parameters = new Map<number, ParameterAnnotation>());
    if (map.has(index)) {
      return map.get(index)!;
    } else {
      const parameter = new ParameterAnnotation(index);
      map.set(index, parameter);
      return parameter;
    }
  }

  GetAnnotation(type: Function): any {
    return this._annotations.get(type);
  }

  RememberAnnotation(type: Function, annotation: any): any {
    this._annotations.set(type, annotation);
    return annotation;
  }

  /**
   * Returns true if the type is an agent
   */
  IsAgent<T extends Function>(test: T): boolean {
    return this._types.has(test);
  }

  /**
   * Returns original type of the agent
   */
  GetType<T extends Function>(agent: T): T | undefined {
    return this._types.get(agent) as T;
  }

  /**
   * Remember the relationship between type and agent
   */
  RememberType(agent: Function, type: Function): void {
    this._types.set(agent, type);
  }

  GetTypeInfo(type: Function): any {
    return this._infos.get(type);
  }

  RememberTypeInfo(type: Function, info: any) {
    this._infos.set(type, info);
  }

  GetFunctionInvocation(type: Function): Invocation | undefined {
    return this._functionInvocations.get(type);
  }

  SetFunctionInvocation(type: Function, invocation: Invocation) {
    this._functionInvocations.set(type, invocation);
  }

  GetOrCreate<T>(id: string, handler: () => T): T {
    let found = this._registry.get(id);
    /* istanbul ignore else */
    if (!found) {
      found = handler();
      this._registry.set(id, found);
    }
    return found;
  }

  // GetOrCreateSymbol(id: string): symbol {
  //   let found = this._symbols.get(id);
  //   if (!found) {
  //     found = Symbol(id);
  //     this._symbols.set(id, found);
  //   }
  //   return found;
  // }

  // NOT WORKING BECAUSE PROXY !== ORIGIN FUNCTION
  // AddType(agent: Function, origin: Function): void {
  //   let top = agent;
  //   console.log('agent', agent);
  //   console.log('origin', origin);
  //   while (top && top !== origin) {
  //     console.log('prototype', top, origin, top === origin);
  //     this.SetType(top, origin);
  //     top = Object.getPrototypeOf(top);
  //   }
  // }
}

export const Wisdom: AgentFramework = Function(
  '_',
  'return this[__=Symbol.for(_.name)]=this[__]||(this[__]=new _())'
)(AgentFramework);

// create metadata for satellites project
export function GetOrCreate<T>(id: string, handler: () => T): T {
  return Wisdom.GetOrCreate<T>(id, handler);
}

// export function GetOrCreateSymbol(id: string): symbol {
//   return Wisdom.GetOrCreateSymbol(id);
// }
