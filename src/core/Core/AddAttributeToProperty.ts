import { GetOrCreateProperty } from './Internal/GetOrCreateProperty.ts';
import { AddAttribute } from './Internal/AddAttribute.ts';
import { AddVersion } from './Internal/AddVersion.ts';
import { Knowledge } from './Knowledge.ts';

/**
 * equals Reflector(target).property(property, descriptor).addAttribute(attribute);
 */
export function AddAttributeToProperty(
  attribute: object,
  target: object | Function,
  key: string | symbol,
  descriptor?: PropertyDescriptor,
): void {
  const type = Knowledge.add(target);
  const property = GetOrCreateProperty(type, key, descriptor);
  AddAttribute(property, attribute);
  AddVersion(property);
  AddVersion(type);
}
