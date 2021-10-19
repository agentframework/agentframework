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

import { Property } from './Property';
import { Annotation } from './Annotation';


/**
 * @internal
 */
export function GetParameter(property: Property, index: number): Annotation {
  const map = property.parameters || (property.parameters = new Map<number, Annotation>());
  let value = map.get(index);
  if (!value) {
    map.set(index, (value = new Annotation()));
  }
  return value;
}
