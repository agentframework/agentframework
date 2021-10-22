import { GetProperty } from './Helpers/GetProperty';
import { GetParameter } from './Helpers/GetParameter';
import { AddAttribute } from './Helpers/AddAttribute';
import { AddVersion } from './Helpers/AddVersion';
import { GetType } from './Helpers/GetType';
import { CONSTRUCTOR } from './WellKnown';

/**
 * equals Reflector(target).property(property, descriptor).addAttribute(attribute);
 */
export function AddAttributeToProperty(
  attribute: object,
  target: object | Function,
  key: string | symbol,
  descriptor?: PropertyDescriptor
): void {
  const type = GetType(target);
  const property = GetProperty(type, key, descriptor);
  AddAttribute(property, attribute);
  AddVersion(property);
  AddVersion(type);
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
  const type = GetType(target);
  const property = GetProperty(type, key);
  const parameter = GetParameter(property, parameterIndex);
  AddAttribute(parameter, attribute);
  AddVersion(parameter);
  AddVersion(property);
  AddVersion(type);
}

/**
 * equals Reflector(target).addAttribute(attribute);
 */
export function AddAttributeToConstructor(attribute: object, target: object | Function): void {
  const type = GetType(target);
  const property = GetProperty(type, CONSTRUCTOR);
  AddAttribute(property, attribute);
  AddVersion(property);
}

/**
 * equals Reflector(target).parameter(parameterIndex).addAttribute(attribute);
 */
export function AddAttributeToConstructorParameter(
  attribute: object,
  target: object | Function,
  parameterIndex: number
): void {
  const type = GetType(target);
  const property = GetProperty(type, CONSTRUCTOR);
  const parameter = GetParameter(property, parameterIndex);
  AddAttribute(parameter, attribute);
  AddVersion(parameter);
  AddVersion(property);
}
