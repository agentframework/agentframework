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
import { ParameterAnnotation } from './Annotation/Annotation';

export interface Annotation {
  [x: string]: MemberAnnotation;
}

/**
 * Minimal reflection metadata object
 */
export class MemberAnnotation extends Map<string, any> {
  // metadata
  readonly attributes: Array<Attribute>;

  constructor() {
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

  constructor(readonly type: Function, descriptor?: PropertyDescriptor) {
    super();
    descriptor && (this.descriptor = descriptor);
  }

  static get(
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

/**
 *
 */
export class AgentFramework extends WeakMap<Function | object, any> {
  // core
  // key: class, prototype; value: annotation
  // readonly annotations = new WeakMap<Function, any>();

  // core
  // key: Agent Proxy | Agent Constructor | Domain Agent Constructor, value: Original Constructor
  readonly types = new WeakMap<Function | object, Function>();

  // submodule
  // key: any; value: any
  readonly knowledge = new Map<string, any>();

  constructor() {
    super();
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
        const typeAnnotation = this.getOrCreate(type);
        const annotation = PropertyAnnotation.get(typeAnnotation, type, targetKey, descriptor);
        annotation.set(key, value);
        /* istanbul ignore next */
        return original && Reflect.apply(original, Reflect, [key, value])(target, property, descriptor);
      };
    };
  }

  get(type: Function | object): Annotation | undefined {
    return super.get(type);
  }
  /**
   * Get or create annotation
   */
  getOrCreate(type: Function | object): Annotation {
    const originType = type;
    const exists = this.get(originType);
    if (exists) {
      return exists;
    }

    // if (originType === Function.prototype || originType === Object.prototype || originType == null) {
    //   this.set(type, Object.create(null));
    // }
    let annotation;
    if (originType === Function.prototype) {
      this.set(type, (annotation = Object.create(null)));
      return annotation;
    }

    // check parent and build object prototype chain
    const prototype = Reflect.getPrototypeOf(originType);

    this.set(type, (annotation = Object.create(prototype && this.getOrCreate(prototype))));

    // console.log()
    // console.log('1. add', type, '=====>', annotation);
    // const tp = Reflect.getPrototypeOf(type);
    // console.log('2. add', tp, typeof tp, tp === Function, tp === Function.prototype, '=====>', Reflect.getPrototypeOf(annotation));
    return annotation;
  }
}

// AgentFramework Wisdom
export const Wisdom: AgentFramework = Function(
  '_',
  'return this[__=Symbol.for(_.name)]=this[__]||(this[__]=new _())'
)(AgentFramework);

// create singleton metadata for satellites project
export function memorize<T>(agent: Function | object, key: string | symbol, handler: () => T): T {
  const id = (typeof agent === 'function' ? agent.name : agent.constructor.name) + '.' + key.toString();
  let value = Wisdom.knowledge.get(id);
  /* istanbul ignore else */
  if (!value) {
    Wisdom.knowledge.set(id, (value = handler()));
  }
  Reflect.defineProperty(agent, key, { value });
  return value;
}

export function RememberType(agent: Function, type: Function): void {
  Wisdom.types.set(agent, type);
}

