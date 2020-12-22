import { GetSharedType } from '../Helpers/GetSharedType';

/**
 * extensible attribute
 */
export function extensible() {
  return (target: Function) => GetSharedType(`class://${target.name}`, target);
}
