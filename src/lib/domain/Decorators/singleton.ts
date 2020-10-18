import { AnyConstructor, decorateClassProperty } from '../../../dependencies/core';
import { SingletonAttribute } from '../Attributes/SingletonAttribute';
import { PropertyDecorator } from '../../../dependencies/core';

export function singleton<T extends object>(type?: AnyConstructor<T>): PropertyDecorator {
  return decorateClassProperty(new SingletonAttribute(type));
}
