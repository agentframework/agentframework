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
// import { ConstructorInvocation } from '../Invocation/ConstructorInvocation';
// import { IInvocation } from '../../Attribute/IInvocation';
// import { ChainFactory } from './ChainFactory';
// import { TypeInfo } from '../../Reflection/TypeInfo';
//
// /**
//  * @ignore
//  * @hidden
//  */
// export class ConstructorFactory {
//   static createConstructorInvocation<C extends Function>(target: C, design: TypeInfo): IInvocation {
//     let invocation: IInvocation = new ConstructorInvocation(target, design);
//     const initializers = design.getInitializers();
//     invocation = ChainFactory.chainInitializerAttributes(invocation, initializers);
//     const interceptors = design.getInterceptors();
//     return ChainFactory.chainInterceptorAttributes(invocation, interceptors);
//   }
// }
