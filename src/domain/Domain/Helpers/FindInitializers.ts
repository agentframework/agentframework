import { Knowledge } from '../Knowledge';
import { Initializer } from '../Symbols';

export function FindInitializers(target: Function): Array<[Function, Function]> {
  // console.log('FI', target, typeof target);
  const ctor = Knowledge.GetInitializers(target);
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
      if (!Knowledge.HasInitializer(type)) {
        Knowledge.SetInitializers(type, cache.slice());
      }
    }
  }

  Knowledge.SetInitializers(target, found);
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
