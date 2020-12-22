import { Domain } from '../Domain';
import { DomainKnowledge } from '../DomainKnowledge';

export function FindDomain(type: Function): Domain | undefined {
  let prototype = type.prototype;
  const domains = DomainKnowledge.domains;
  while (prototype) {
    const domain = domains.get(prototype.constructor);
    if (domain) {
      // console.log('FOUND');
      return domain;
    }
    // console.log('NOT FOUND!!!');
    prototype = Reflect.getPrototypeOf(prototype);
  }
  return;
}
