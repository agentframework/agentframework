import { NamedTypes } from '../DomainKnowledge';

export function GetNamedType<T>(name: string, type: T): T {
  const types = NamedTypes.v1;
  const found = types.get(name);
  if (!found) {
    types.set(name, type);
    return type;
  }
  return <T>found;
}
