import { decorateMember, AnyConstructor } from '../../../dependencies/core';
import { TransitAttribute } from '../Attributes/TransitAttribute';

export function transit<T extends object>(type?: AnyConstructor<T>) {
  return decorateMember(new TransitAttribute(type));
}
