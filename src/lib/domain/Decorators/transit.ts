import { decorateClassProperty, AnyConstructor, PropertyDecorator } from '../../../dependencies/core';
import { TransitAttribute } from '../Attributes/TransitAttribute';

export function transit<T extends object>(type?: AnyConstructor<T>): PropertyDecorator {
  return decorateClassProperty(new TransitAttribute(type));
}
