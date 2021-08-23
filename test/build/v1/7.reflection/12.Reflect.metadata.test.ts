/* tslint:disable */

// declare var require: any;
// import { Reflector } from '../../../../release';

describe('Reflect metadata', () => {
  describe('# should able to', () => {
    it('metadata', () => {
      expect(Reflect['metadata']).toBeTruthy();
    });

    // it('upgrade agent', () => {
    //   Reflect['metadata'] = function() {};
    //   // delete require.cache;
    //   return import('../../../lib').then(({ agent, Agent, IsAgent }) => {
    //     @agent()
    //     class MongoDB {}
    //     expect(IsAgent(MongoDB)).toBeTruthy();
    //   });
    // });
  });
});

/* istanbul ignore if  */
// if (typeof Reflect !== 'object') {
//   throw new Error('AgentFramework requires ES6 (ES2015) support');
// }

// Add support when
// tag this function to prevent inject itself
// Reflect['metadata']['$AgentFramework'] = true;
//
// const metadataFn = Reflect['metadata'];
//
// if (typeof metadataFn !== 'function') {
//   // Install Reflect.metadata for tsc only
//   // tsc will add following code to the generated js file. in order to utilize these information.
//   // we create Reflect.metadata to capture these information and save to Reflection objects
//   //     Reflect.metadata("design:type", Function),
//   //     Reflect.metadata("design:paramtypes", []),
//   //     Reflect.metadata("design:returntype", String)
//   Reflect['metadata'] = function(key: string, value: any) {
//     return function(target: Function | Object, property?: string | symbol, descriptor?: PropertyDescriptor): void {
//       if (property) {
//         Reflector(target)
//           .property(property, descriptor)
//           .addMetadata(key, value);
//       } else {
//         Reflector(target).addMetadata(key, value);
//       }
//     };
//   };
//   // tag this function to prevent inject itself
//   Reflect['metadata']['$AgentFramework'] = true;
// } else if (!metadataFn['$AgentFramework']) {
//   // ========================================================================================
//   // ES.future - intercept Reflect.metadata because tsc generate 3 parameters
//   // ========================================================================================
//   Reflect['metadata'] = function(key: string, value: any) {
//     const metadataDecorator = metadataFn(key, value);
//     return function(target: Function | Object, property?: string | symbol, descriptor?: PropertyDescriptor): void {
//       if (property) {
//         Reflector(target)
//           .property(property, descriptor)
//           .addMetadata(key, value);
//         return metadataDecorator(target as object, property!);
//       } else {
//         Reflector(target).addMetadata(key, value);
//         return metadataDecorator(target as Function);
//       }
//     };
//   };
// }
