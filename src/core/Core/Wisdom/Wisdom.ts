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

import { Soul } from './Soul';
import { Annotator } from './Annotator';
import { define } from '../Helpers/Prototype';

export class AgentFramework extends Map<Function | object, any> {
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
        let proto;
        let prop;
        if (typeof targetKey === 'undefined') {
          proto = (<Function>target).prototype;
          prop = 'constructor';
        } else {
          proto = target;
          prop = targetKey;
        }
        Annotator.findProperty(this.add(proto), proto, prop, descriptor).set(key, value);
        /* istanbul ignore next */
        return metadata && Reflect.apply(metadata, Reflect, [key, value])(proto, targetKey, descriptor);
      };
    });

    // mark the time
    Reflect['metadata']['now'] = Date.now();
  }

  /* istanbul ignore next */
  [Symbol.for('nodejs.util.inspect.custom')]() {
    return this.constructor;
    // return /* tsb::insert: require('package.json').version */;
    // return `${this.constructor.name}@#VERSION <${this.toString()}>`;
  }

  // /**
  //  * Get
  //  */
  // get(type: Function | object | symbol | string): any | undefined {
  //   return super.get(type);
  // }

  set<V>(key: Function | object, value: V): V {
    super.set(key, value);
    return value;
  }

  /**
   * find
   */
  add(type: Function | object): Soul {
    const found = this.get(type);
    if (found) {
      return found;
    }

    if (type === Function.prototype) {
      return this.set(type, Object.create(null));
    }

    // check parent and build object prototype chain
    const prototype = Reflect.getPrototypeOf(type);
    return this.set(type, Object.create(prototype && this.add(prototype)));
  }

  get knowledge() {
    const value = this.get(this) || this.set(this, new Map());
    define(this, 'knowledge', { value });
    return value;
  }
}

// create singleton metadata for satellites project
// AgentFramework Wisdom
export const Wisdom: AgentFramework = Function(
  '_',
  'return ((_,__)=>this[_]||(this[_]=new __()))(Symbol.for(_.name),_)'
)(AgentFramework);
