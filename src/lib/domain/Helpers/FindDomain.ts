import { Domain } from '../Domain';
import { Knowledge } from '../Knowledge';

export function FindDomain(target: Function): Domain | undefined {
  let prototype = target.prototype;
  while (prototype) {
    const domain = Knowledge.GetDomain(prototype.constructor);
    if (domain) {
      // console.log('FOUND');
      return domain;
    }
    // console.log('NOT FOUND!!!');
    prototype = Reflect.getPrototypeOf(prototype);
  }
  return;
}
