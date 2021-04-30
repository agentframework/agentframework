import { decorateMember } from '../../../dependencies/core';
import { SingletonAttribute } from '../Attributes/SingletonAttribute';
import { AnyClass } from '../Class';

export function singleton(type?: AnyClass): PropertyDecorator {
  return decorateMember(new SingletonAttribute(type));
}
