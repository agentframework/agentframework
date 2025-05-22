import { Knowledge } from './Knowledge.ts';
import { GetOrCreateProperty } from './Internal/GetOrCreateProperty.ts';
import { GetOrCreateParameter } from './Internal/GetOrCreateParameter.ts';
import { AddAttribute } from './Internal/AddAttribute.ts';
import { AddVersion } from './Internal/AddVersion.ts';

/**
 * equals Reflector(target).property(targetKey).parameter(descriptor).addAttribute(attribute);
 */
export function AddAttributeToPropertyParameter(
  attribute: object,
  target: object | Function,
  key: string | symbol,
  parameterIndex: number,
): void {
  const type = Knowledge.add(target);
  const property = GetOrCreateProperty(type, key);
  const parameter = GetOrCreateParameter(property, parameterIndex);
  AddAttribute(parameter, attribute);
  AddVersion(parameter);
  AddVersion(property);
  AddVersion(type);
}
