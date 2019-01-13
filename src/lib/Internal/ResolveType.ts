import { Type } from '../Reflection/Type';
import { Types } from './Cache';

export function ResolveType(prototype: Object): Type {
  let found = Types.get(prototype);
  if (!found) {
    found = new Type(prototype);
    Types.set(prototype, found);
  }
  return found;
}
