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

import { CONSTRUCTOR } from '../WellKnown';
import { Knowledge } from '../Knowledge';
import { GetProperty } from './GetProperty';

/*@__PURE__*/
export function __metadata(metadataKey: string, metadataValue: any): Function {
  return function (target: Function | object, targetKey?: string | symbol, descriptor?: PropertyDescriptor) {
    if (targetKey == null) {
      target = (<Function>target).prototype;
      targetKey = CONSTRUCTOR;
    }
    const knowledge = Knowledge.add(target);
    const property = GetProperty(knowledge, target, targetKey, descriptor);
    property.set(metadataKey, metadataValue);
  };
}
