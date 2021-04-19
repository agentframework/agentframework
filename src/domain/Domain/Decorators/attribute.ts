import { GetNamedType } from '../Helpers/GetNamedType';

/**
 * extensible attribute
 */
export function attribute(): ClassDecorator {
  return (target) => GetNamedType(`attribute://${target.name}`, target);
}
