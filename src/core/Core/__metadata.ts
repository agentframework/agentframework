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

import { Knowledge } from './Knowledge';
import { GetProperty } from './Helpers/GetProperty';
import { AddMetadata } from './Helpers/AddMetadata';
import { CONSTRUCTOR } from './WellKnown';
import { Annotation } from './Annotation/Annotation';

/*@__PURE__*/
export function __metadata(key: string, value: any): Function {
  return function (target: Function | object, targetKey?: string | symbol, descriptor?: PropertyDescriptor) {
    let annotation: Annotation;
    if (targetKey) {
      annotation = GetProperty(Knowledge.add(target), targetKey, descriptor);
    } else {
      annotation = GetProperty(Knowledge.add((target as Function).prototype), CONSTRUCTOR, descriptor);
    }
    AddMetadata(annotation, key, value);
  };
}
