import { GetSharedType } from '../Helpers/GetSharedType';

/**
 * extensible attribute
 */
export function attribute() {
  return (target: Function) => GetSharedType(`attribute://${target.name}`, target);
}
