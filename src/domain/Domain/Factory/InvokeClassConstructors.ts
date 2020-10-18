//
// export function InvokeClassConstructors(type: Function, instance: object, params: Array<any>): void {
//   // NOTE: Constructor support, deep first
//   let prototype: any = Reflector(instance.constructor).type;
//
//   while (prototype) {
//     if (!IsAgent(prototype.constructor)) {
//       const name = prototype.name;
//       if (!name) {
//         break;
//       }
//
//       const descriptor = Reflect.getOwnPropertyDescriptor(instance, name);
//
//       console.log('ctor', prototype, name);
//       if (descriptor && typeof descriptor.value == 'function') {
//         Reflect.apply(descriptor.value, instance, params);
//       }
//     }
//
//     prototype = Reflect.getPrototypeOf(prototype);
//   }
// }
