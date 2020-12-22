import { DomainKnowledge } from '../DomainKnowledge';

export function GetSharedType<T>(id: string, type: T): T {
  const types = DomainKnowledge.extensibles;
  const found = types.get(id);
  if (!found) {
    types.set(id, <any>type);
    return type;
  }
  return <any>found;
}
