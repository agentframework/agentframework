import { decorateMember } from '../../../dependencies/core';
import { TransitAttribute } from '../Attributes/TransitAttribute';
import { AnyClass } from '../Class';

export function transit(type?: AnyClass): PropertyDecorator {
  return decorateMember(new TransitAttribute(type));
}
