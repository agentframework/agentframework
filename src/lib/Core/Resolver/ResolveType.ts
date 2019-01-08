import { Type } from '../Reflection/Type';
import { Instances } from '../Cache';

export function ResolveType(prototype: Object): Type {
  let found = Instances.get(prototype);
  if (!found) {
    found = new Type(prototype);
    Instances.set(prototype, found);
  }
  return found;
}
