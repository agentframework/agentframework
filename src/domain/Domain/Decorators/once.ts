import { decorateClassProperty, PropertyDecorator } from '../../../dependencies/core';
import { OnceAttribute } from '../Attributes/OnceAttribute';

export function once(): PropertyDecorator {
  return decorateClassProperty(new OnceAttribute());
}

// import { ExtensibleAttribute } from './Attributes/ExtensibleAttribute';
// import { DomainCore } from './Internal/DomainCore';
//
// /**
//  * extensible attribute
//  */
// function OnceDecorator(target: object, propertyKey: string | symbol, descriptor?: any) {
//   console.log('ONCE', propertyKey, descriptor);
// }
//
// export function once(): MethodDecorator | PropertyDecorator {
//   return OnceDecorator;
// }
