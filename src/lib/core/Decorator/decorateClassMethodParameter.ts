// /* Copyright 2016 Ling Zhang
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License. */
//
// import { CanDecorate } from './CanDecorate';
// import { ClassMethodParameterAttribute } from '../Interfaces/TypeAttributes';
// import { AddAttributeToClassMethodParameter } from '../Annotation/AddAttribute';
// import { MethodParameterDecorator } from './decorators';
//
// /**
//  * Decorate class method parameter
//  */
// export function decorateClassMethodParameter<T extends ClassMethodParameterAttribute>(attribute: T): MethodParameterDecorator {
//   return function (target: object, targetKey: string | symbol, parameterIndex: number): void {
//     if (typeof target === 'function') {
//       throw new Error('ClassMethodParameterAttribute not allow declare on class static member');
//     }
//     if (CanDecorate(attribute, target, targetKey, parameterIndex)) {
//       AddAttributeToClassMethodParameter(attribute, target.constructor, targetKey, parameterIndex);
//     }
//   };
// }
