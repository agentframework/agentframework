/**
 * @internal
 */
import { Knowledge } from './Knowledge';
import { alter } from '../Helpers/alter';

export function adapter(type: typeof Reflect, key: string) {
  return function (this: any, _: Function): any {
    let id: symbol;
    return (id = Symbol.for(key)), type[id] || alter(type, id, type.construct(Knowledge, [type, key]));
  };
}
