import { alter } from './alter';

export function Once<T>(target: object | Function, getterKey: string | symbol, value: T): T {
  if ('undefined' !== typeof value) {
    alter(target, getterKey, { value });
  }
  return value;
}
