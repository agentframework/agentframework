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

import { METADATA } from './WellKnown';
import { adapter } from './Annotation/adapter';
import { Type } from './Annotation/Type';

@adapter(Reflect, METADATA)
export class Knowledge {
  /* istanbul ignore next */
  // @ts-ignore
  static has(key: Function | object): boolean {
    /* placeholder::Knowledge.has */
  }

  /* istanbul ignore next */
  // @ts-ignore
  static get(key: Function | object): any | undefined {
    /* placeholder::Knowledge.get */
  }

  /* istanbul ignore next */
  // @ts-ignore
  static set(key: Function | object, value: Type): any {
    /* placeholder::Knowledge.set */
  }

  /* istanbul ignore next */
  // @ts-ignore
  static add(key: Function | object): any {
    /* placeholder::Knowledge.add */
  }
}
