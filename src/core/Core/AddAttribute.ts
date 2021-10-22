import { Knowledge } from './Knowledge';
import { GetProperty } from './Helpers/GetProperty';
import { GetParameter } from './Helpers/GetParameter';
import { AddAttribute } from './Helpers/AddAttribute';
import { AddVersion } from './Helpers/AddVersion';
import { CONSTRUCTOR } from './WellKnown';
import { GetVersion } from './Helpers/GetVersion';

/**
 * equals Reflector(target).property(property, descriptor).addAttribute(attribute);
 */
export function AddAttributeToProperty(
  attribute: object,
  target: object | Function,
  key: string | symbol,
  descriptor?: PropertyDescriptor
): void {
  const knowledge = Knowledge.add(target);
  const property = GetProperty(knowledge, target, key, descriptor);
  AddAttribute(property, attribute);
  AddVersion(property);
}

/**
 * equals Reflector(target).property(targetKey).parameter(descriptor).addAttribute(attribute);
 */
export function AddAttributeToPropertyParameter(
  attribute: object,
  target: object | Function,
  key: string | symbol,
  parameterIndex: number
): void {
  const version = GetVersion(target);
  const knowledge = Knowledge.add(target);
  const property = GetProperty(knowledge, target, key);
  const parameter = GetParameter(property, parameterIndex);
  AddAttribute(parameter, attribute);
  AddVersion(parameter);
  AddVersion(property);
}

/**
 * equals Reflector(target).addAttribute(attribute);
 */
export function AddAttributeToConstructor(attribute: object, target: object | Function): void {
  AddAttributeToProperty(attribute, target, CONSTRUCTOR);
}

/**
 * equals Reflector(target).parameter(parameterIndex).addAttribute(attribute);
 */
export function AddAttributeToConstructorParameter(
  attribute: object,
  target: object | Function,
  parameterIndex: number
): void {
  AddAttributeToPropertyParameter(attribute, target, CONSTRUCTOR, parameterIndex);
}
