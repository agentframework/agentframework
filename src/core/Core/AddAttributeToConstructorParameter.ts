import { Knowledge } from './Knowledge.ts';
import { GetOrCreateConstructor } from './Internal/GetOrCreateConstructor.ts';
import { GetOrCreateParameter } from './Internal/GetOrCreateParameter.ts';
import { AddAttribute } from './Internal/AddAttribute.ts';
import { AddVersion } from './Internal/AddVersion.ts';

/**
 * equals Reflector(target).parameter(parameterIndex).addAttribute(attribute);
 */
export function AddAttributeToConstructorParameter(
  attribute: object,
  target: object | Function,
  parameterIndex: number,
): void {
  const type = Knowledge.add(target);
  const ctor = GetOrCreateConstructor(type);
  const parameter = GetOrCreateParameter(ctor, parameterIndex);
  AddAttribute(parameter, attribute);
  AddVersion(parameter);
  AddVersion(ctor);
}
