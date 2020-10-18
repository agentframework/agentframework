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

import { AddMetadata } from '../src/core/Core/Annotation/AddMetadata';
const original: Function = Reflect['metadata'];

if (!original || !original['now']) {
  // if one day the browser implemented Reflect.metadata. We will reflector all
  // code related to metadata data in order to have a better performance.
  if (original) {
    // ===========================================
    // Reflect.metadata is defined
    // ===========================================
    function metadata(
      this: { key: string; value: any },
      target: Function | object,
      property?: string | symbol,
      descriptor?: PropertyDescriptor
    ): any {
      AddMetadata(this.key, this.value, target, property, descriptor);
      // save metadata to Reflect.metadata (if have)
      return original.apply(Reflect, [this.key, this.value])(target, property, descriptor);
    }
    Reflect['metadata'] = function (key: string, value: any) {
      return metadata.bind({ key, value });
    };
  } else {
    // ===========================================
    // Reflect.metadata is undefined
    // ===========================================
    function metadata(
      this: { key: string; value: any },
      target: Function | object,
      property?: string | symbol,
      descriptor?: PropertyDescriptor
    ): any {
      AddMetadata(this.key, this.value, target, property, descriptor);
    }
    Reflect['metadata'] = function (key: string, value: any) {
      return metadata.bind({ key, value });
    };
  }
  Reflect['metadata']['now'] = Date.now();
}

export * from '../src/core/index';

export * from '../src/domain/index';
