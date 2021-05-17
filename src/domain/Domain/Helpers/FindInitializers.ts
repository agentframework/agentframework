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

import { Initializers } from '../DomainKnowledge';
import { Initializer } from '../Symbols';

export function FindInitializers(target: Function): Array<[Function, Function]> {
  const initializers = Initializers.v1;
  // console.log('FI', target, typeof target);
  const ctor = initializers.get(target);
  if (ctor) {
    // console.log('HIT cache =================', target, ctor);
    return ctor;
  }

  // const map = new Map<Function, Function>();
  const found: Array<[Function, Function]> = [];

  let prototype = target.prototype;
  while (prototype && prototype.constructor !== Object) {
    const descriptor = Reflect.getOwnPropertyDescriptor(prototype, Initializer);
    if (descriptor && typeof descriptor.value == 'function') {
      found.unshift([descriptor.value, prototype.constructor]);
      // map.set(descriptor.value, prototype.constructor);
    }
    prototype = Reflect.getPrototypeOf(prototype);
  }

  // console.log('find', target, found);
  // console.log('map', target.name, map);

  // make cache for next calls
  if (found.length) {
    const cache = new Array<[Function, Function]>();
    for (const layer of found) {
      const type = layer[1];
      cache.push(layer);
      if (!initializers.has(type)) {
        initializers.set(type, cache.slice());
      }
    }
  }

  initializers.set(target, found);
  // console.log('*********', target.name, '==>', found);

  return found;
  // const fin = [];
  // for (const ctor of ctors) {
  //   // const name = ctor.name;
  //   fin.unshift(ctor);
  // }
  //
  // console.log('find', target, '====>', fin);
  //
  // return fin;
}
