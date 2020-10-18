import { AnyConstructor, decorateClassProperty, PropertyDecorator } from '../../../dependencies/core';
import { SingletonAttribute } from '../Attributes/SingletonAttribute';

export function singleton<T extends object>(type?: AnyConstructor<T>): PropertyDecorator {
  return decorateClassProperty(new SingletonAttribute(type));
}
