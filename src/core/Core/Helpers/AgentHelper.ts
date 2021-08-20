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

import { Types } from '../Knowledge';

/**
 * @internal
 */
export function RememberAgentType(agent: Function, type: Function): void {
  Types.v1.set(agent, type);
  Types.v1.set(agent.prototype, type.prototype);
}

/**
 * Find original type of the agent (if have)
 */
export function GetAgentType<T extends Function | object>(type: T): T | undefined {
  return <T | undefined>Types.v1.get(type);
}

/**
 * Return true if giving type is an agent
 */
export function IsAgent<T extends Function>(test: Function | object, type?: T): test is T {
  const found = Types.v1.get(test);
  if (type) {
    return found === type;
  }
  return found ? found !== test : false;
}
