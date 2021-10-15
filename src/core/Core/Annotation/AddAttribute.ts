import { Knowledge } from '../Knowledge';
import { GetProperty } from './GetProperty';
import { GetParameter } from './GetParameter';

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
  const annotation = GetProperty(knowledge, target, key, descriptor);
  annotation.attributes.push(attribute);
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
  const annotation = GetParameter(property, parameterIndex);
  annotation.attributes.push(attribute);
}
