// the memorize can be used on both class getter or static getter
import { define } from '../Helpers/Prototype';
import { Wisdom } from './Wisdom';

export function Remember<T>(agent: Function, key: string, type?: new () => T): T {
  let map = Wisdom.value;
  const topic = agent.name + '.' + key;
  let value = map.get(topic);
  /* istanbul ignore next */
  if (!value) {
    map.set(topic, (value = Reflect.construct(type || WeakMap, [])));
  }
  define(agent, key, { value });
  return value;
}
