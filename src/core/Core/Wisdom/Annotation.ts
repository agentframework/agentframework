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

import { Attribute } from '../Interfaces/Attribute';

/**
 * metadata for a member. key: string, value: any
 */
export class Annotation extends Map<string, any> {
  constructor() {
    super();
    this.attributes = [];
  }

  // metadata
  readonly attributes: Array<Attribute>;
}

/**
 * Parameter
 */
export class Parameter extends Annotation {
  constructor(readonly index: number) {
    super();
  }
}

/**
 * Metadata for a property.
 */
export class Property extends Annotation {
  descriptor?: PropertyDescriptor;

  parameters?: Map<number, Parameter>;

  value?: Annotation;
  getter?: Annotation;
  setter?: Annotation;

  constructor(readonly target: object | Function, readonly key: string | symbol, descriptor?: PropertyDescriptor) {
    super();
    descriptor && (this.descriptor = descriptor);
  }
}
