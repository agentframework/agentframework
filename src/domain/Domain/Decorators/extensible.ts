import { GetNamedType } from '../Helpers/GetNamedType';

/**
 * extensible attribute
 */
export function extensible(id?: string): ClassDecorator {
  return (target) => GetNamedType(id || `class://${target.name}`, target);
}
