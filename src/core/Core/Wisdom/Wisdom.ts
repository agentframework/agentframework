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
  get name(): string {
    return /* replace::release.name */ 'agentframework';
  }

  get version(): string {
    return /* replace::release.version */ 'dev';
  }

  get timestamp(): string {
    return /* replace::release.timestamp */ '';
  }

  constructor() {
    super();

    // ===============================================================================
    // if one day the browser implemented Reflect.metadata. We will reflector all
    // code related to metadata data in order to have a better performance.
    // ===============================================================================
    const r = Reflect;
    const m = 'metadata';
    const id = 'now';
    const metadata: Function | undefined = r[m] && r[m].bind(r);
    const wisdom = this;

    //
    // target   | property
    // -----------------------------------------------
    // Function + undefined     = Constructor
    // Object   + PropertyKey   = Class member
    // Function + PropertyKey   = Class static member
    //
    r.set(r, m, function (key: string, value: any) {
      return function (target: Function | object, targetKey?: string | symbol, descriptor?: PropertyDescriptor) {
        let newTarget;
        let newTargetKey;
        if (arguments.length === 1) {
          newTarget = (<Function>target).prototype;
          newTargetKey = 'constructor';
        } else {
          newTarget = target;
          newTargetKey = targetKey!;
        }
        FindProperty(wisdom.add(newTarget), newTarget, newTargetKey, descriptor).set(key, value);
        /* istanbul ignore next */
        return metadata && metadata(key, value)(target, targetKey, descriptor);
      };
    });

    // mark the time
    r[m][id] = Date.now();
  }

  [Symbol.for('Deno.symbols.customInspect')]() {
    return this.name + '@' + this.version;
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return this.name + '@' + this.version;
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

/**
 * tslib.__decorate implementation
 */
export function __decorate(decorators: Function[], target: any, key?: string | symbol, desc?: any): any {
  if (arguments.length > 3) {
    for (let i = decorators.length - 1; i >= 0; i--) {
      decorators[i](target, key, desc);
    }
  } else {
    for (let i = decorators.length - 1; i >= 0; i--) {
      target = decorators[i](target);
    }
  }
  return target;
}

/**
 * tslib.__metadata implementation
 */
export function __metadata(metadataKey: any, metadataValue: any): Function | void {
  return function (target: Function | object, targetKey?: string | symbol, descriptor?: PropertyDescriptor) {
    if (arguments.length === 1) {
      target = (<Function>target).prototype;
      targetKey = 'constructor';
    }
    FindProperty(Wisdom.add(target), target, targetKey!, descriptor).set(metadataKey, metadataValue);
  };
}

/**
 * tslib.__param implementation
 */
export function __param(paramIndex: number, decorator: Function): Function {
  return function (target: Function | object, targetKey: string | symbol) {
    decorator(target, targetKey, paramIndex);
  };
}
