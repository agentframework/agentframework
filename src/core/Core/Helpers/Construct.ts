/**
 * @internal
 */
import { Knowledge } from '../Annotation/Knowledge';
import { DefineValue } from '../Object/DefineValue';

export interface Helper extends Record<symbol, any> {
  construct<T>(target: new (...args: any[]) => T, args: any[]): T;
}

export function Construct(helper: Helper, helperKey: string): Knowledge {
  const key: unique symbol = Symbol.for(helperKey);
  return helper[key] || DefineValue(helper, key, helper.construct(Knowledge, [helper, helperKey]));
}

