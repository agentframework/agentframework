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

export interface Annotation {
  [x: string]: MemberAnnotation;
}

/**
 * Minimal reflection metadata object
 */
export class MemberAnnotation extends Map<string, any> {
  // metadata
  readonly attributes: Array<Attribute>;

  constructor() {
    super();
    this.attributes = [];
  }
}

export class ParameterAnnotation extends MemberAnnotation {
  constructor(readonly index: number) {
    super();
  }
}

export class PropertyAnnotation extends MemberAnnotation {
  descriptor?: PropertyDescriptor;

  parameters?: Map<number, ParameterAnnotation>;
  value?: MemberAnnotation;

  getter?: MemberAnnotation;
  setter?: MemberAnnotation;

  constructor(readonly type: Function, descriptor?: PropertyDescriptor) {
    super();
    descriptor && (this.descriptor = descriptor);
  }
}


// const __decorate = function(decorators, target, key, desc) {
//   const args = arguments.length;
//   let descriptor = args < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc;
//   let decorator;
//
//   if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
//     descriptor = Reflect.decorate(decorators, target, key, desc);
//   else {
//     for (var idx = decorators.length - 1; idx >= 0; idx--) {
//       if ((decorator = decorators[idx])) {
//         descriptor =
//           (args < 3 ? decorator(descriptor) : args > 3 ? decorator(target, key, descriptor) : decorator(target, key)) ||
//           descriptor;
//       }
//     }
//   }
//   return args > 3 && descriptor && Object.defineProperty(target, key, descriptor), descriptor;
// };
