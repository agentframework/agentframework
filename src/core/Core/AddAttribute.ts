import { Knowledge } from './Knowledge';
import { GetProperty } from './Annotation/GetProperty';
import { GetParameter } from './Annotation/GetParameter';
import { CONSTRUCTOR } from './WellKnown';

/**
 * equals Reflector(target).property(property, descriptor).addAttribute(attribute);
 */
export function AddAttributeToProperty(
  attribute: object,
  target: object | Function,
  key: string | symbol,
  descriptor: PropertyDescriptor | undefined,
  interceptable: boolean
): void {
  const knowledge = Knowledge.add(target);
  const property = GetProperty(knowledge, target, key, descriptor);
  property.attributes.push(attribute);
  if (interceptable) {
    property.interceptors.push(attribute);
    property.touch();
    if (key !== CONSTRUCTOR) {
      GetProperty(knowledge, target, CONSTRUCTOR, descriptor).touch();
    }
  }
}

/**
 * equals Reflector(target).property(targetKey).parameter(descriptor).addAttribute(attribute);
 */
export function AddAttributeToPropertyParameter(
  attribute: object,
  target: object | Function,
  key: string | symbol,
  parameterIndex: number,
  interceptable: boolean
): void {
  const knowledge = Knowledge.add(target);
  const property = GetProperty(knowledge, target, key);
  const parameter = GetParameter(property, parameterIndex);
  parameter.attributes.push(attribute);
  if (interceptable) {
    parameter.interceptors.push(attribute);
    parameter.touch();
    property.touch();
    if (key !== CONSTRUCTOR) {
      GetProperty(knowledge, target, CONSTRUCTOR).touch();
    }
  }
}
