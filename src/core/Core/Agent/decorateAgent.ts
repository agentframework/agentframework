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
// import { Attribute } from '../Interfaces/Attribute';
// import { CreateAgent } from './CreateAgent';
// import { CanDecorate } from '../Decorator/CanDecorate';
// import { AddAttributeToClass } from '../Reflection/Annotation/AddAttribute';
// import { AgentAttribute } from './AgentAttribute';
//
// /**
//  * Decorate an agent with customized initializer, interceptors and attributes
//  */
// export function decorateAgent(options: AgentAttribute, attributes?: Array<Attribute>): ClassDecorator {
//   // upgrade target constructor to agent
//   // this method will be called
//   return <F extends Function>(target: F): F | void => {
//     // apply extra attributes as metadata
//     if (attributes && attributes.length) {
//       for (const attribute of attributes) {
//         if (CanDecorate(attribute, target)) {
//           AddAttributeToClass(attribute, target);
//         }
//       }
//     }
//
//     // the attributes to initialize agent constructor
//     return CreateAgent(target, options);
//   };
// }
