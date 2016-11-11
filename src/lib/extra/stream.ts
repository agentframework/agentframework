// import { IAttribute, IInterceptor, IInvocation, decorateClassMember } from '../core';
//
// /**
//  * Normalize the result { ok: 1, result: '', message: '' }
//  * @returns {(target:Object, propertyKey:(string|symbol), descriptor?:PropertyDescriptor)=>void}
//  */
// export function stream() {
//   return decorateClassMember(new InjectAttribute());
// }
//
// export class InjectAttribute implements IAttribute, IInterceptor {
//
//   constructor() {
//   }
//
//   beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
//     return true;
//   }
//
//   getInterceptor(): IInterceptor {
//     return this;
//   }
//
//   intercept(invocation: IInvocation, parameters: ArrayLike<any>): any {
//     console.log('generator')
//     const value = invocation.invoke(parameters);
//     return value;
//   }
//
// }
