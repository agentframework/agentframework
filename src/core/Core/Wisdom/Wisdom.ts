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
import { define, mount } from '../Helpers/Prototype';
import { CONSTRUCTOR } from '../WellKnown';

@mount(Reflect, 'metadata')
export class Wisdom extends WeakMap<any, any> {
  /**
   * @internal
   */
  static get id(): string {
    return /* replace::release.name */ 'agentframework';
  }

  /**
   * @internal
   */
  static get version(): string {
    return /* replace::release.version */ '2.0.0';
  }

  /**
   * @internal
   */
  static get timestamp(): string {
    return /* replace::release.timestamp */ '2016-11-03T00:00:00.000Z';
  }

  /**
   * @internal
   */
  /* istanbul ignore next */
  static has(type: Function | object): boolean {
    /* ignore this dummy code, for placeholder only */
    return !!this.get(type);
  }

  /**
   * @internal
   */
  /* istanbul ignore next */
  static get(type: Function | object): any {
    /* ignore this dummy code, for placeholder only */
    return this.add(type);
  }

  /**
   * @internal
   */
  /* istanbul ignore next */
  static add(type: Function | object): any {
    /* ignore this dummy code, for placeholder only */
    return this.has(type);
  }

  constructor(readonly reflect: typeof Reflect, key: PropertyKey) {
    super();

    // ===============================================================================
    // if one day the browser implemented Reflect.metadata. We will reflector all
    // code related to metadata data in order to have a better performance.
    // ===============================================================================
    const r = reflect;
    const m = 'metadata';
    const ts = 'now';
    const now = new Date();
    /* istanbul ignore next */
    const metadata: Function | undefined = r[m] && r[m].bind(r);
    const wisdom = this;
    //
    // target   | property
    // -----------------------------------------------
    // Function + undefined     = Constructor
    // Object   + PropertyKey   = Class member
    // Function + PropertyKey   = Class static member
    //
    function value(key: string, value: any) {
      return function (target: Function | object, targetKey?: string | symbol, descriptor?: PropertyDescriptor) {
        let newTarget;
        let newTargetKey;
        if (arguments.length === 1) {
          newTarget = (<Function>target).prototype;
          newTargetKey = CONSTRUCTOR;
        } else {
          newTarget = target;
          newTargetKey = targetKey!;
        }
        FindProperty(wisdom.add(newTarget), newTarget, newTargetKey, descriptor).set(key, value);
        /* istanbul ignore next */
        return metadata && metadata(key, value)(target, targetKey, descriptor);
      };
    }
    // mark the time
    value[ts] = now.getTime();
    define(r, m, { value });
    define(r, key, { value: wisdom });
    wisdom.set(wisdom, new Map());
  }

  /**
   * Get
   */
  // get(type: Function | object): any | undefined {
  //   return super.get(type || this);
  // }

  /**
   * returns value instead this object
   */
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
    const prototype = this.reflect.getPrototypeOf(type);
    return this.set(type, Object.create(prototype && this.add(prototype)));
  }
}

/**
 * tslib.__metadata implementation
 */
/*@__PURE__*/
export function __metadata(metadataKey: string, metadataValue: any): Function {
  return function (target: Function | object, targetKey?: string | symbol, descriptor?: PropertyDescriptor) {
    if (targetKey == null) {
      target = (<Function>target).prototype;
      targetKey = CONSTRUCTOR;
    }
    FindProperty(Wisdom.add(target), target, targetKey, descriptor).set(metadataKey, metadataValue);
  };
}
