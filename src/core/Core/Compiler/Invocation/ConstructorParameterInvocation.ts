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
//
// import { IInvocation } from '../../Attribute/IInvocation';
// import { TypeInfo } from '../../Reflection/TypeInfo';
// import { ICompiler } from '../ICompiler';
// import { AgentCompiler } from '../AgentCompiler';
// import { readonly } from '../../Internal/Readonly';
//
// /**
//  * @ignore
//  * @hidden
//  */
// export abstract class ConstructorParameterInvocation<C extends Function> implements IInvocation {
//   constructor(readonly _target: C, readonly _design: TypeInfo, private _receiver?: any) {}
//
//   get target(): Function {
//     return Reflect.getPrototypeOf(this._target.prototype).constructor;
//   }
//
//   get proxy(): Function {
//     return this._target;
//   }
//
//   get agent(): object | undefined {
//     return this._receiver;
//   }
//
//   set agent(value: object | undefined) {
//     this._receiver = value;
//   }
//
//   get design(): TypeInfo {
//     return this._design;
//   }
//
//   get compiler(): ICompiler {
//     return readonly(this, 'compiler', new AgentCompiler());
//   }
//
//   // compile the parameter when using
//   get compiledParameters(): Map<number, [IInvocation, IInvocation]> {
//     const params = this.compiler.compileParameters(this.proxy, this.design, this.agent);
//     return readonly(this, 'compiledParameters', params);
//   }
//
//   // // only compile the target when using
//   // get compiledTarget(): any {
//   //   const target = this.compiler.compile(this.proxy, this._params);
//   //   return readonly(this, 'compiledTarget', target);
//   // }
//
//   abstract invoke<T>(params: Arguments, receiver?: any): T;
// }
//
// /**
//  * constructor with parameter interceptors
//  *
//  * @ignore
//  * @hidden
//  */
// export class InterceptedConstructorParameterInvocation<C extends Function> extends ConstructorParameterInvocation<C> {
//   invoke<T>(params: Arguments, receiver?: any): T {
//     let args = Array.prototype.slice.call(parameters, 0);
//     // only apply the found parameter
//     for (const [idx, [, interceptor]] of this.compiledParameters.entries()) {
//       args[idx] = interceptor.invoke([args[idx], idx, args], receiver);
//     }
//     // remember the constructor parameters
//     // Parameters.set(this._args, args);
//     // return Reflect.construct(this.target, args, this.compiledTarget);
//     return <any>args;
//   }
// }

/**
 * constructor without parameter interceptors, better performance
 *
 * @ignore
 * @hidden
 */
// export class DirectConstructorParameterInvocation<C extends Function> extends ConstructorParameterInvocation<C> {
//   invoke<T>(params: Arguments): T {
//     // if (Array.isArray(parameters)) {
//     //   Parameters.set(this._args, parameters);
//     // }
//     // create an object for specified target
//     // console.log('2222', this._target);
//     // console.log('2222', target, parameters);
//     // return Reflect.construct(this.target, parameters, );
//     return this.compiledTarget, <any>parameters;
//   }
// }
