// import { Domain } from '../Domain';
// import { GetDomain } from './GetDomain';
//
// /**
//  * Find domain from object or type
//  */
// export function FindDomain(target: Function | object): Domain | undefined {
//   let prototype;
//   if (typeof target === 'function') {
//     prototype = target.prototype;
//   } else {
//     prototype = target;
//   }
//
//   while (prototype) {
//     const domain = GetDomain(prototype);
//     if (domain) {
//       // console.log('FOUND');
//       return domain;
//     }
//     // console.log('NOT FOUND!!!');
//     prototype = Reflect.getPrototypeOf(prototype);
//   }
//   return;
// }
