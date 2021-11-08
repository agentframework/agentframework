import { GetProperty } from './Helpers/GetProperty';
import { GetParameter } from './Helpers/GetParameter';
import { AddAttribute } from './Helpers/AddAttribute';
import { AddVersion } from './Helpers/AddVersion';
import { Knowledge } from './Knowledge';
import { GetConstructor } from './Helpers/GetConstructor';

/**
 * equals Reflector(target).property(property, descriptor).addAttribute(attribute);
 */
export function AddAttributeToProperty(
  attribute: object,
  target: object | Function,
  key: string | symbol,
  descriptor?: PropertyDescriptor
): void {
  const type = Knowledge.add(target);
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
  const type = Knowledge.add(target);
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
  const type = Knowledge.add(target);
  const ctor = GetConstructor(type);
  AddAttribute(ctor, attribute);
  AddVersion(ctor);
}

/**
 * equals Reflector(target).parameter(parameterIndex).addAttribute(attribute);
 */
export function AddAttributeToConstructorParameter(
  attribute: object,
  target: object | Function,
  parameterIndex: number
): void {
  const type = Knowledge.add(target);
  const ctor = GetConstructor(type);
  const parameter = GetParameter(ctor, parameterIndex);
  AddAttribute(parameter, attribute);
  AddVersion(parameter);
  AddVersion(ctor);
}
