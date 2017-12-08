import { Reflection } from '../reflection';
import { ToPropertyKey, IsUndefined, ORIGIN_INSTANCE, PROXY_PROTOTYPE } from '../utils';
import { InterceptorFactory } from './factory';

/**
 * Add proxy interceptor
 * @param target
 * @returns {T}
 * @constructor
 */
// export function AddProxyInterceptor<T extends object>(target: T) {
//   const instanceProxyHandler = {
//     get: ProxyGetInterceptor,
//     set: ProxySetInterceptor
//     // has(target: T, p: PropertyKey): boolean {
//     //   throw new Error('has Not supported');
//     // },
//     // getPrototypeOf(target: T): object | null {
//     //   let origin;
//     //   if (Reflect.has(target, PROXY_PROTOTYPE)) {
//     //     origin = Reflect.get(target, PROXY_PROTOTYPE);
//     //   }
//     //   return origin || Reflect.getPrototypeOf(target);
//     // },
//     // setPrototypeOf(target: T, v: any): boolean {
//     //   throw new Error('setPrototypeOf Not supported');
//     // },
//     // isExtensible(target: T): boolean {
//     //   throw new Error('isExtensible Not supported');
//     // },
//     // preventExtensions(target: T): boolean {
//     //   throw new Error('preventExtensions Not supported');
//     // },
//     // getOwnPropertyDescriptor(target: T, p: PropertyKey): PropertyDescriptor | undefined {
//     //   throw new Error('getOwnPropertyDescriptor Not supported');
//     // },
//     // deleteProperty(target: T, p: PropertyKey): boolean {
//     //   throw new Error('deleteProperty Not supported');
//     // },
//     // defineProperty(target: T, p: PropertyKey, attributes: PropertyDescriptor): boolean {
//     //   throw new Error('defineProperty Not supported');
//     // },
//     // enumerate(target: T): PropertyKey[] {
//     //   throw new Error('enumerate Not supported');
//     // },
//     // ownKeys(target: T): PropertyKey[] {
//     //   throw new Error('ownKeys Not supported');
//     // },
//     // apply(target: T, thisArg: any, argArray?: any): any {
//     //   throw new Error('apply Not supported');
//     // },
//     // construct(target: T, argArray: any, newTarget?: any): object {
//     //   throw new Error('construct Not supported');
//     // }
//   };
//   // console.log('create proxy for ', target);
//   return new Proxy(target, instanceProxyHandler);
// }

/**
 * The **get** interceptor (es6)
 * @param target
 * @param p
 * @param receiver
 * @returns {any}
 * @constructor
 */
// export function ProxyGetInterceptor<T extends object>(target: T, p: PropertyKey, receiver: any): any {
//
//   const propertyKey = ToPropertyKey(p);
//   const origin = Reflect.get(target, ORIGIN_INSTANCE) || target;
//   const reflection = Reflection.getInstance(origin, propertyKey);
//
//   // ignore property without attributes
//   if (!reflection) {
//     return Reflect.get(origin, p, receiver);
//   }
//
//   // ignore prototype interceptors and getter/setter
//   // intercept by overloading ES5 prototype (static intercept)
//   // if (!IsUndefined(reflection.descriptor)) {
//   //   return Reflect.get(origin, p, receiver);
//   // }
//
//   // intercept by implement ES6 proxy (dynamic intercept)
//   if (!IsUndefined(reflection.descriptor) && reflection.descriptor.value) {
//     return InterceptorFactory.createFunctionInterceptor(reflection.getAttributes(), reflection.descriptor.value);
//   }
//
//   // create field getter interceptor on the fly
//   // TODO: get invocation from cache
//   const invocation = InterceptorFactory.createGetterInterceptor(reflection.getAttributes(), origin, propertyKey, receiver);
//
//   // call getter
//   return invocation.invoke([]);
//
// }

/**
 * The **set** interceptor
 * @param target
 * @param p
 * @param value
 * @param receiver
 * @returns {boolean}
 * @constructor
 */
// export function ProxySetInterceptor<T extends object>(target: T, p: PropertyKey, value: any, receiver: any): boolean {
//
//   const propertyKey = ToPropertyKey(p);
//   const origin = Reflect.get(target, ORIGIN_INSTANCE) || target;
//   const reflection = Reflection.getInstance(origin, propertyKey);
//
//   // ignore property without attributes
//   if (!reflection) {
//     return Reflect.set(origin, p, value, receiver);
//   }
//
//   // ignore prototype interceptors and getter/setter
//   // if (!IsUndefined(reflection.descriptor)) {
//   //   return Reflect.set(origin, p, value, receiver);
//   // }
//   if (!IsUndefined(reflection.descriptor) && !reflection.descriptor.set) {
//     return Reflect.set(origin, p, value, receiver);
//   }
//
//   // create field setter interceptor on the fly
//   const invocation = InterceptorFactory.createSetterInterceptor(reflection.getAttributes(), origin, propertyKey, receiver);
//
//   // call the interceptors
//   return invocation.invoke([value]);
// }
