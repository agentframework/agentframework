import { GetSharedType } from '../Helpers/GetSharedType';

/**
 * extensible attribute
 */
export function extensible(): ClassDecorator {
  return target => GetSharedType(`class://${target.name}`, target);
}
