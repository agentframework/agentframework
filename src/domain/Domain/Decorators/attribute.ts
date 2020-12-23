import { GetSharedType } from '../Helpers/GetSharedType';

/**
 * extensible attribute
 */
export function attribute(): ClassDecorator {
  return <F extends Function>(target: F): F => GetSharedType(`attribute://${target.name}`, target);
}
