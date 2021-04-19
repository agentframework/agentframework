import { InMemoryDomain } from '../InMemoryDomain';
import { Domain } from '../Domain';
import { Domains } from '../DomainKnowledge';

export function GetSystemDomain(): Domain {
  const domains = Domains.v1;
  const existDomain = domains.get(domains);
  if (existDomain) {
    return existDomain;
  }
  const newDomain = Reflect.construct(InMemoryDomain, []);
  Reflect.defineProperty(newDomain, 'name', {
    value: 'SystemDomain'
  });
  domains.set(domains, newDomain);
  return newDomain;
}
