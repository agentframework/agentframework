// /**
//  *
//  * @param target
//  * @param type
//  * @constructor
//  */
// export function HasPrototype(target: object, type: object): boolean {
//   let current: object | null = target;
//   while (current) {
//     if (current === type) {
//       return true;
//     }
//     current = Reflect.getPrototypeOf(current);
//   }
//   return false;
// }
