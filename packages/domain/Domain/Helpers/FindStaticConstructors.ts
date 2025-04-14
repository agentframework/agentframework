// import { DomainModule } from '../Knowledges/DomainModule';
//
// export function FindStaticConstructors(target: Function): Array<Function> {
//   const list = [];
//   let prototype = target.prototype;
//   while (prototype) {
//     if (DomainModule.IsStaticConstructorMarked(prototype.constructor)) {
//       // console.log('marked', prototype.constructor);
//       break;
//     }
//     // console.log('push', prototype.constructor);
//     list.unshift(prototype.constructor);
//     prototype = Reflect.getPrototypeOf(prototype);
//   }
//   return list;
// }
