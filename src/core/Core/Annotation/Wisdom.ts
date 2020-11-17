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

import { Attribute } from '../Interfaces/Attribute';
import { set } from '../Helpers/Prototype';

/**
 *
 */
export type Annotation = {};

/**
 * metadata for a member. key: string, value: any
 */
export class Member extends Map<string, any> {
  constructor() {
    super();
  }
  // metadata
  readonly attributes: Array<Attribute> = [];
}

/**
 * Metadata for a property.
 */
export class Property extends Member {
  descriptor?: PropertyDescriptor;

  parameters?: Map<number, Parameter>;

  value?: Member;
  getter?: Member;
  setter?: Member;

  protected constructor(
    readonly target: object | Function,
    readonly key: string | symbol,
    descriptor?: PropertyDescriptor
  ) {
    super();
    descriptor && (this.descriptor = descriptor);
  }

  static find(
    property: Annotation,
    target: object | Function,
    key: string | symbol,
    descriptor?: PropertyDescriptor
  ): Property {
    const propertyDescriptor = Reflect.getOwnPropertyDescriptor(property, key);
    let value: Property;
    if (propertyDescriptor) {
      value = propertyDescriptor.value;
      // NOTE: just in case decorate parameter called at first and decorate property called at second
      // if (descriptor && !value.descriptor) {
      //   value.descriptor = descriptor;
      // }
    } else {
      property[key] = value = new Property(target, key, descriptor);
    }
    return value;
  }
}

export class Parameter extends Member {
  protected constructor(readonly index: number) {
    super();
  }

  static find(property: Property, index: number): Parameter {
    const map = property.parameters || (property.parameters = new Map<number, Parameter>());
    let value = map.get(index);
    if (!value) {
      map.set(index, (value = new Parameter(index)));
    }
    return value;
  }
}

export class AgentFramework extends Map<Function | object | symbol | string, any> {
  constructor() {
    super();

    // ===============================================================================
    // if one day the browser implemented Reflect.metadata. We will reflector all
    // code related to metadata data in order to have a better performance.
    // ===============================================================================
    const { metadata }: any = Reflect;

    //
    // target   | property
    // -----------------------------------------------
    // Function + undefined     = Constructor
    // Object   + PropertyKey   = Class member
    // Function + PropertyKey   = Class static member
    //
    Reflect.set(Reflect, 'metadata', (key: string, value: any) => {
      return (target: Function | object, targetKey?: string | symbol, descriptor?: PropertyDescriptor) => {
        let property;
        if (typeof targetKey === 'undefined') {
          target = Reflect.get(target, 'prototype');
          property = 'constructor';
        } else {
          property = targetKey;
        }
        Property.find(this.add(target), target, property, descriptor).set(key, value);
        /* istanbul ignore next */
        return metadata && Reflect.apply(metadata, Reflect, [key, value])(target, targetKey, descriptor);
      };
    });
    // mark the time
    Reflect['metadata']['now'] = Date.now();
  }

  /**
   * Get
   */
  get(type: Function | object | symbol | string): any | undefined {
    return super.get(type);
  }

  /**
   * find
   */
  add(type: Function | object): Annotation {
    const found = this.get(type);
    if (found) {
      return found;
    }

    let created: Annotation;
    if (type === Function.prototype) {
      this.set(type, (created = Object.create(null)));
      return created;
    }

    // check parent and build object prototype chain
    const prototype = Reflect.getPrototypeOf(type);
    this.set(type, (created = Object.create(prototype && this.add(prototype))));
    return created;
  }
}

// AgentFramework Wisdom
export const Wisdom: AgentFramework = Function(
  '_',
  'return this[__=Symbol.for(_.name)]=this[__]||(this[__]=new _())'
)(AgentFramework);

// create singleton metadata for satellites project
// the memorize can be used on both class getter or static getter
export function memorize<T>(agent: Function, key: string, type?: new () => T): T {
  // const id1 = Reflect.getOwnPropertyDescriptor(agent, key);
  const id = Symbol.for(agent.name + '.' + key);
  let value = Wisdom.get(id);
  /* istanbul ignore else */
  if (!value) {
    Wisdom.set(id, (value = Reflect.construct(type || WeakMap, [])));
  }
  // console.log('know', agent, key, '====', value);
  return set(agent, key, value);
}
