import { GetSharedType } from '../Helpers/GetSharedType';

/**
 * extensible attribute
 */
export function attribute(): ClassDecorator {
  return target => GetSharedType(`attribute://${target.name}`, target);
}
