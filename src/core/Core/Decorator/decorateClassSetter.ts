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
// // import { Reflector } from '../Reflector';
// import { CanDecorate } from './CanDecorate';
// import { ClassMethodAttribute } from '../Interfaces/TypeAttributes';
// import { AddAttributeToClassSetter } from '../Annotation/AddAttribute';
// import { MethodDecorator } from './decorators';
//
// /**
//  * Decorate class method
//  */
// export function decorateClassSetter<T extends ClassMethodAttribute>(attribute: T): MethodDecorator {
//   return function (target: object, targetKey: string | symbol, descriptor: PropertyDescriptor): void {
//     if (typeof target === 'function') {
//       throw new Error('ClassMethodAttribute not allow declare on class static member');
//     }
//     if (CanDecorate(attribute, target, targetKey, descriptor)) {
//       AddAttributeToClassSetter(attribute, target.constructor, targetKey, descriptor);
//       // Reflector(target)
//       //   .property(propertyKey, descriptor)
//       //   .setter.addAttribute(attribute);
//     }
//   };
// }
