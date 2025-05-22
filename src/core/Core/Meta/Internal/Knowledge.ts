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

import { NOW } from '../../WellKnown.ts';
import { Type } from './Type.ts';

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

  /**
   * @internal
   */
  get commit(): string {
    return /* replace::release.vcs.commit */ '0000000';
  }

  constructor() {
    super();
    // @ts-ignore
    this[NOW] = Date.now();
    this.set(this, new Map());
  }

  /**
   * add a key
   */
  add(key: Function | object): any {
    const found = super.get(key);
    if (found) {
      return found;
    }

    if (key === Function.prototype) {
      const type = new Type(key, Object.create(null));
      this.set(key, type);
      return type;
    }

    // check parent and build object prototype chain
    const prototype = Reflect.getPrototypeOf(key);
    const type = new Type(key, Object.create(prototype && this.add(prototype).prototype));
    this.set(key, type);
    return type;
  }
}
