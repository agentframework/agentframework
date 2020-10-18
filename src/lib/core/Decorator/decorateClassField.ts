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
// import { ClassFieldAttribute } from '../Interfaces/TypeAttributes';
// import { AddAttributeToClassField } from '../Annotation/AddAttribute';
// import { FieldDecorator } from './decorators';
//
// /**
//  * Decorate class field
//  */
// export function decorateClassField<T extends ClassFieldAttribute>(attribute: T): FieldDecorator {
//   return function(target: object, targetKey: string | symbol, descriptor?: PropertyDescriptor): void {
//     if (typeof target === 'function') {
//       throw new Error('ClassFieldAttribute not allow declare on class static member');
//     }
//     if (typeof descriptor === 'object') {
//       throw new TypeError('ClassFieldAttribute can only decorate on class field property');
//     }
//     // TypeScript is not smart enough to identify the PropertyDescriptor on method
//     if (CanDecorate(attribute, target, targetKey)) {
//       AddAttributeToClassField(attribute, target.constructor, targetKey);
//       // Reflector(target)
//       //   .property(propertyKey)
//       //   .value.addAttribute(attribute);
//     }
//   };
// }
