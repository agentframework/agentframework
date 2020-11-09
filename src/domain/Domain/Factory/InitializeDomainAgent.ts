// import { FindInitializers } from '../Helpers/FindInitializers';
// import { AnyConstructor } from '@agentframework/core';
//
// export function InitializeDomainAgent<T extends object>(target: AnyConstructor<T>, instance: T): void {
// console.log('aaa', instance, target);
// NOTE: Constructor support, deep first
// const initializers = FindInitializers(target);
// if (initializers.length) {
//   for (const ctor of initializers) {
//     Reflect.apply(ctor, instance, []);
//   }
// }
// }
