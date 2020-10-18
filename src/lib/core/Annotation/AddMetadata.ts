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

import { Annotator } from './Annotator';

export function AddMetadata(
  key: string,
  value: any,
  target: Function | object,
  property?: string | symbol,
  descriptor?: PropertyDescriptor
) {
  const type = typeof target === 'function' ? target : target.constructor;
  const targetKey = typeof property === 'undefined' ? 'constructor' : property;
  const typeAnnotation = Annotator.type(type);
  const annotation = Annotator.property(typeAnnotation, type, targetKey, descriptor);
  Annotator.addMetadata(annotation, key, value);
}
