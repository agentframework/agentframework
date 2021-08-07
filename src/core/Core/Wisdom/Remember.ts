/* Copyright 2016 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

// the memorize can be used on both class getter or static getter
import { define } from '../Helpers/Prototype';
import { Wisdom } from './Wisdom';

export function Remember<T>(agent: Function, key: string, type?: new () => any): T {
  let map = Wisdom.get(Wisdom);
  const topic = agent.name + '.' + key;
  let value = map.get(topic);
  /* istanbul ignore next */
  if (!value) {
    map.set(topic, (value = Reflect.construct(type || WeakMap, [])));
  }
  define(agent, key, { value });
  return value;
}
