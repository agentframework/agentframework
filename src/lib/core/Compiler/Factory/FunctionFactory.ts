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
// import { DirectMethodInvocation, InterceptedMethodInvocation } from '../Invocation/MethodInvocations';
// import { IInvocation } from '../../Attribute/IInvocation';
// import { IAttribute } from '../../Attribute/IAttribute';
// import { PropertyInfo } from '../../Reflection/PropertyInfo';
// import { ChainFactory } from './ChainFactory';
//
// /**
//  * @ignore
//  * @hidden
//  */
// export class FunctionFactory {
//   static createFunction(
//     attributes: Array<IAttribute>,
//     target: Function,
//     method: Function,
//     design: PropertyInfo
//   ): Function {
//     return function(this: any) {
//       let origin = new DirectMethodInvocation(target, method, design);
//       const chain = ChainFactory.chainInterceptorAttributes(origin, attributes);
//       if (chain instanceof DirectMethodInvocation) {
//         // do nothing
//         return Reflect.apply(method, this, arguments);
//       }
//       return chain.invoke(arguments, this);
//     };
//   }
//
//   static createFunctionWithParameters(
//     attributes: Array<IAttribute>,
//     target: Function,
//     method: Function,
//     design: PropertyInfo,
//     params?: Map<number, IInvocation>
//   ) {
//     let origin: IInvocation;
//     if (params && params.size) {
//       origin = new InterceptedMethodInvocation(target, method, design, params);
//     } else {
//       origin = new DirectMethodInvocation(target, method, design);
//     }
//     const chain = ChainFactory.chainInterceptorAttributes(origin, attributes);
//     if (chain instanceof DirectMethodInvocation) {
//       // do nothing
//       return method;
//     } else {
//       let factory: Function;
//       if (params && params.size) {
//         factory = new Function('c', `return function ${method.name}$(){return c.invoke(arguments,this)}`);
//       } else {
//         factory = new Function('c', `return function(){return c.invoke(arguments,this)}`);
//       }
//       return factory(chain);
//     }
//   }
// }
