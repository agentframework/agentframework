import { GetSharedType } from '../Helpers/GetSharedType';

/**
 * extensible attribute
 */
export function extensible(): ClassDecorator {
  return <F extends Function>(target: F): F => GetSharedType(`class://${target.name}`, target);
}
