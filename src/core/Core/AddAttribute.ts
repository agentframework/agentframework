import { Knowledge } from './Knowledge';
import { GetProperty } from './Annotation/GetProperty';
import { GetParameter } from './Annotation/GetParameter';

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
  property.attributes.push(attribute);
  property.version++;
  // if (interceptable) {
  //   property.interceptors.push(attribute);
  //   property.version++;
  //   if (key !== CONSTRUCTOR) {
  //     const root = GetProperty(knowledge, target, CONSTRUCTOR, descriptor);
  //     root.version++;
  //   }
  // }
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
  const knowledge = Knowledge.add(target);
  const property = GetProperty(knowledge, target, key);
  const parameter = GetParameter(property, parameterIndex);
  parameter.attributes.push(attribute);
  parameter.version++;
  property.version++;
  // if (interceptable) {
  //   parameter.interceptors.push(attribute);
  //   parameter.version++;
  //   property.version++;
  //   if (key !== CONSTRUCTOR) {
  //     const type = GetProperty(knowledge, target, CONSTRUCTOR);
  //     type.version++;
  //   }
  // }
}
