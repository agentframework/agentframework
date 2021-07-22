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
import { FindProperty } from './Annotator';
import { define } from '../Helpers/Prototype';

export class AgentFramework extends WeakMap<Function | object, any> {
  /**
   * for troubleshot
   */
  get name() {
    return 'agentframework@2.0.0-rc.20';
    // return /* tsb::insert "require('package.json').version" */;
  }

  constructor() {
    super();

    // ===============================================================================
    // if one day the browser implemented Reflect.metadata. We will reflector all
    // code related to metadata data in order to have a better performance.
    // ===============================================================================
    const meta = 'metadata';
    const metadata: any = Reflect[meta];

    //
    // target   | property
    // -----------------------------------------------
    // Function + undefined     = Constructor
    // Object   + PropertyKey   = Class member
    // Function + PropertyKey   = Class static member
    //
    Reflect.set(Reflect, meta, (key: string, value: any) => {
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
        FindProperty(this.add(proto), proto, prop, descriptor).set(key, value);
        /* istanbul ignore next */
        return metadata && Reflect.apply(metadata, Reflect, [key, value])(proto, targetKey, descriptor);
      };
    });

    // mark the time
    Reflect['metadata']['now'] = Date.now();
  }

  [Symbol.for('Deno.symbols.customInspect')]() {
    return this.name;
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return this.name;
  }

  // /**
  //  * Get
  //  */
  // get(type: Function | object): any | undefined {
  //   return super.get(type);
  // }

  set<V>(key: Function | object, value: V): V {
    super.set(key, value);
    return value;
  }

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

  /**
   * key: string, value: any
   */
  get value(): Map<string, any> {
    const value = this.get(this) || this.set(this, new Map());
    define(this, 'value', { value });
    return value;
  }

  // static get wisdom() {
  //   return Function('_', 'return ((_,__)=>this[_]||(this[_]=new __()))(Symbol.for(_.name),_)')(this);
  // }
  //
  // static add(type: Function | object): Soul {
  //   return this.wisdom.add(type);
  // }
  //
  // static get(type: Function | object): Soul | undefined {
  //   return this.wisdom.get(type);
  // }
}

// create singleton metadata for satellites project
// AgentFramework Wisdom
export const Wisdom = Function(
  '_',
  'return ((_,__)=>this[_]||(this[_]=new __()))(Symbol.for(_.name),_)'
)(AgentFramework) as AgentFramework;
