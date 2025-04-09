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

import { Arguments, Class } from '@agentframework/agent';

// export interface DefaultConstructor<T extends object> extends Class<T> {
//   new (): T;
// }
//
// export interface ParameterConstructor<T extends object> extends Class<T> {
//   new (...params: any[]): T;
// }

// export type Constructor<T extends object> = DefaultConstructor<T> | ParameterConstructor<T>;

export type AgentReference = Function | string | symbol;

export type Params<T> = T extends new (...args: infer P) => any ? P : Arguments;

export type Agent<T> = T extends Class<infer R> ? R : T extends string | symbol ? any : never;

// CustomConstructor is a helper interface to infer the return type from ClassInitializer function
// interface CustomConstructor<T> extends Function {
//   [ClassInitializer](domain: Domain, target: Function, params: Arguments): T;
// }

// function construct<T extends AgentIdentifier>(target: T, params?: AgentParameters<T>, transit?: boolean): Agent<T> {
//   console.log(target, params, transit);
//   throw new Error();
// }
//
// class BaseClass {}
//
// class AbstractClass extends BaseClass {
//   public t1!: number;
// }
//
// // class NumberClass {
// //   t1!: number;
// // }
//
// class NumberStringClass extends AbstractClass {
//   constructor(a: number, b: string) {
//     super();
//   }
//   /* @deprecated */
//   public t1!: number;
//   public t2!: number;
// }
//
// class NumberStringType {
//   constructor(public a: number, public b: string) {}
// }
//
// class NumberType {
//   constructor(public a: number) {}
//
//   static n = 1;
//
//   static [ClassInitializer](domain: Domain, target: typeof NumberType, params: Arguments) {
//     return new NumberStringType(1, '2');
//   }
// }
//
// class NoType {}
//
// construct(NumberType, [1]); // ok
//
// console.log(AbstractClass, NumberStringClass, NumberStringType, NoType);
// const t0 = construct(AbstractClass, ['ss']); // should error
// const t1 = construct(NumberClass, []); // ok
// const t2 = construct(NumberStringClass, [11, 'w']); // ok
// const t3 = construct(NumberStringClass, [11, 11]); // ok, param error
// const ts1 = construct(NumberStringType, [1, '2']); // ok
// const ts3 = construct(NumberType, [1, '2']); // ok, param error

// let b = 1;
// b = t0;
// b = ts1;
// b = ts2;
// b = ts3; // not check
//
// console.log(t0, t1, t2, t3, ts1, ts2, b);
