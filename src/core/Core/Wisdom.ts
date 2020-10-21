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

import { Attribute } from './Interfaces/Attribute';

export type ClassAnnotation = {};

/**
 * Minimal reflection metadata object
 */
export class MemberAnnotation extends Map<string, any> {
  // metadata
  readonly attributes: Array<Attribute>;

  protected constructor() {
    super();
    this.attributes = [];
  }
}

export class PropertyAnnotation extends MemberAnnotation {
  descriptor?: PropertyDescriptor;

  parameters?: Map<number, ParameterAnnotation>;
  value?: MemberAnnotation;

  getter?: MemberAnnotation;
  setter?: MemberAnnotation;

  protected constructor(readonly type: Function, descriptor?: PropertyDescriptor) {
    super();
    descriptor && (this.descriptor = descriptor);
  }

  static get(
    annotation: ClassAnnotation,
    type: Function,
    key: string | symbol,
    descriptor?: PropertyDescriptor
  ): PropertyAnnotation {
    const annotationProperty = Reflect.getOwnPropertyDescriptor(annotation, key);
    let value: PropertyAnnotation;
    if (annotationProperty) {
      value = annotationProperty.value;
      // just in case decorate parameter first and decorate property second
      // if (descriptor && !annotationProperty.descriptor) {
      //   console.log('d', value);
      //   annotationProperty.descriptor = descriptor;
      // }
    } else {
      annotation[key] = value = new PropertyAnnotation(type, descriptor);
    }
    return value;
  }
}

export class ParameterAnnotation extends MemberAnnotation {
  constructor(readonly index: number) {
    super();
  }

  static get(
    annotation: PropertyAnnotation,
    target: Function,
    property: PropertyKey,
    index: number
  ): ParameterAnnotation {
    const map = annotation.parameters || (annotation.parameters = new Map<number, ParameterAnnotation>());
    let parameter = map.get(index);
    if (!parameter) {
      map.set(index, (parameter = new ParameterAnnotation(index)));
    }
    return parameter;
  }
}

export class Knowledge extends Map<Function | object | symbol | string, any> {
  constructor() {
    super();
    // ===============================================================================
    // if one day the browser implemented Reflect.metadata. We will reflector all
    // code related to metadata data in order to have a better performance.
    // ===============================================================================
    const original: Function | undefined = Reflect['metadata'];
    //
    // target   | property
    // -----------------------------------------------
    // Function + undefined     = Constructor
    // Object   + PropertyKey   = Class member
    // Function + PropertyKey   = Class static member
    //
    Reflect['metadata'] = (key: string, value: any) => {
      return (target: Function | object, property?: string | symbol, descriptor?: PropertyDescriptor) => {
        const type = typeof target === 'function' ? target : target.constructor;
        const targetKey = typeof property === 'undefined' ? 'constructor' : property;
        PropertyAnnotation.get(this.getOrCreate(type), type, targetKey, descriptor).set(key, value);
        /* istanbul ignore next */
        return original && Reflect.apply(original, Reflect, [key, value])(target, property, descriptor);
      };
    };
  }

  /**
   * Get
   */
  // get(type: Function | object): Annotation | undefined {
  //   return super.get(type);
  // }

  /**
   * Get or create
   */
  getOrCreate(type: Function | object): ClassAnnotation {
    const exists = this.get(type);
    if (exists) {
      return exists;
    }

    let annotation;
    if (type === Function.prototype) {
      this.set(type, (annotation = Object.create(null)));
      return annotation;
    }

    // check parent and build object prototype chain
    const prototype = Reflect.getPrototypeOf(type);
    this.set(type, (annotation = Object.create(prototype && this.getOrCreate(prototype))));

    return annotation;
  }
}

// AgentFramework Wisdom
export const Wisdom: Knowledge = Function(
  '_',
  'return this[__=Symbol.for(_.name)]=this[__]||(this[__]=new _())'
)(Knowledge);

// create singleton metadata for satellites project
export function memorize<T>(agent: Function | object, key: string | symbol, type: new () => T): T {
  // const id1 = Reflect.getOwnPropertyDescriptor(agent, key);
  let id: symbol;
  if (typeof key === 'string') {
    id = Symbol.for((typeof agent === 'function' ? agent.name : agent.constructor.name) + '.' + key);
  } else {
    id = key;
  }
  let value = Wisdom.get(id);
  /* istanbul ignore else */
  if (!value) {
    Wisdom.set(id, (value = Reflect.construct(type, [])));
  }
  console.log('know', agent, key, '====', value);
  Reflect.defineProperty(agent, key, { value });
  return value;
}
