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

import { Namespaces } from '../../../agent/Agent/Knowledges/Namespaces.ts';

export function GetNamedType<T>(name: string, type: T): T {
  const ns = Namespaces.v1;
  const found = ns.get(name);
  if (!found) {
    ns.set(name, type);
    return type;
  }
  return <T>found;
}
