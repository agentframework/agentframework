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

import { CONSTRUCTOR, NOW } from '../WellKnown';
import { GetProperty } from './GetProperty';
import { alter } from '../Helpers/alter';

/**
 * Use WeakMap to prevent memory leak
 */
export class Knowledge extends WeakMap<Function | object, any> {
  /**
   * @internal
   */
  get id(): string {
    return /* replace::release.name */ 'agentframework';
  }

  /**
   * @internal
   */
  get version(): string {
    return /* replace::release.version */ '2.0.0';
  }

  /**
   * @internal
   */
  get timestamp(): string {
    return /* replace::release.timestamp */ '2016-11-03T00:00:00.000Z';
  }

  constructor(reflect: typeof Reflect, key: string) {
    super();

    // ===============================================================================
    // if one day the browser implemented Reflect.metadata. We will reflector all
    // code related to metadata data in order to have a better performance.
    // ===============================================================================
    const r = reflect;
    /* istanbul ignore next */
    const metadata: Function | undefined = r[key] && r[key].bind(r);
    const self = this;
    //
    // target   | property
    // -----------------------------------------------
    // Function + undefined     = Constructor
    // Object   + PropertyKey   = Class member
    // Function + PropertyKey   = Class static member
    //
    let value: Function;
    if (metadata) {
      /* istanbul ignore next */
      value = function (key: string, value: any) {
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
          GetProperty(self.add(newTarget), newTarget, newTargetKey, descriptor).set(key, value);
          return metadata(key, value)(target, targetKey, descriptor);
        };
      };
    } else {
      value = function (key: string, value: any) {
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
          GetProperty(self.add(newTarget), newTarget, newTargetKey, descriptor).set(key, value);
        };
      };
    }
    // mark the time
    value[NOW] = Date.now();
    alter(r, key, { value });
    self.set(self, new Map());
  }

  /**
   * add a key
   */
  add(key: Function | object): object {
    const found = super.get(key);
    if (found) {
      return found;
    }

    if (key === Function.prototype) {
      return this.set(key, Object.create(null));
    }

    // check parent and build object prototype chain
    const prototype = Reflect.getPrototypeOf(key);
    const knowledge = Object.create(prototype && this.add(prototype));
    this.set(key, knowledge);
    return knowledge;
  }
}
