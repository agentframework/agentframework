import { set } from './set';

export function setIfValue<T>(target: object | Function, getterKey: string | symbol, value: T): T {
  if ('undefined' !== typeof value) {
    set(target, getterKey, { value });
  }
  return value;
}
