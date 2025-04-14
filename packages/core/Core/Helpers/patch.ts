/**
 * @internal
 */
import { Knowledge } from '../Annotation/Knowledge';
import { set } from './set';

export function patch(type: typeof Reflect, key: string) {
  return function (this: any, _: Function): any {
    let id: symbol;
    // @ts-ignore
    return (id = Symbol.for(key)), type[id] || set(type, id, type.construct(Knowledge, [type, key]));
  };
}
