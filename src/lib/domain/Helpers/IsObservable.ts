import { IsFunction } from './IsFunction';

/**
 * Return true if value is observable
 */
export function IsObservable(value: any): boolean {
  return 'object' === typeof value && !!value && IsFunction(value['lift']) && IsFunction(value['subscribe']);
}
