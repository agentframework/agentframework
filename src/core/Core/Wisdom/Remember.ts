// the memorize can be used on both class getter or static getter
import { define } from '../Helpers/Prototype';
import { Wisdom } from './Wisdom';

export function Remember<T>(agent: Function, key: string, type?: new () => T): T {
  let { knowledge } = Wisdom;
  // const id1 = Reflect.getOwnPropertyDescriptor(agent, key);
  const topic = Symbol.for(agent.name + '.' + key);
  let value = knowledge.get(topic);
  /* istanbul ignore else */
  if (!value) {
    knowledge.set(topic, (value = Reflect.construct(type || WeakMap, [])));
  }
  define(agent, key, { value });
  return value;
}
