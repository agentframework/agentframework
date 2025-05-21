import { Knowledge } from './Knowledge.ts';
import { GetOrCreateConstructor } from './Internal/GetOrCreateConstructor.ts';
import { AddAttribute } from './Internal/AddAttribute.ts';
import { AddVersion } from './Internal/AddVersion.ts';

/**
 * equals Reflector(target).addAttribute(attribute);
 */
export function AddAttributeToConstructor(attribute: object, target: object | Function): void {
  const type = Knowledge.add(target);
  const ctor = GetOrCreateConstructor(type);
  AddAttribute(ctor, attribute);
  AddVersion(ctor);
}
