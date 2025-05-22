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
// import { OnDemandMemberInfo } from './OnDemandMemberInfo';
// import { MemberAnnotation } from '../Annotation/Annotation';
// // import { cache } from '../Helpers/Cache';
// import { MemberKinds } from '../Interfaces/MemberKinds';
// import { AbstractConstructor } from '../Constructor';
// import { Attribute } from '../Interfaces/Attribute';
// import { AddAttributeToClassMethod } from '../Annotation/AddAttribute';
//
// export class OnDemandPropertyValueInfo extends OnDemandMemberInfo {
//   get kind(): MemberKinds {
//     return MemberKinds.Method;
//   }
//
//   get type(): AbstractConstructor<any> | undefined {
//     return this.getOwnMetadata('design:type');
//   }
//
//   addAttribute<A4 extends Attribute>(attribute: A4): void {
//     AddAttributeToClassMethod(attribute, this.declaringType, this.key);
//   }
//
//   // protected get annotated(): boolean {
//   //   const annotation = this.propertyAnnotationOrUndefined;
//   //   return !!(annotation && annotation.value);
//   // }
//
//   protected get annotation(): MemberAnnotation | undefined {
//     const property = this.propertyAnnotationOrUndefined;
//     return property && property.value;
//     // return cache(this, 'annotation', method);
//   }
// }
