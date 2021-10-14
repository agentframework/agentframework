/**
 * @internal
 */
import { Knowledges } from '../Knowledges';

export function decorate(impl: typeof Reflect, name: string) {
  return function (this: any, type: any): any {
    const id = Symbol.for(name);
    return impl[id] || impl.construct(Knowledges, [impl, id]);
  };
}
