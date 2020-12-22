import { AnyConstructor, decorateMember } from '../../../dependencies/core';
import { SingletonAttribute } from '../Attributes/SingletonAttribute';

export function singleton<T extends object>(type?: AnyConstructor<T>) {
  return decorateMember(new SingletonAttribute(type));
}
