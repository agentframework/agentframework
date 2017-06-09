import { Reflection } from '../reflection';
import { InterceptorFactory } from '../interceptor';
import { ToPropertyKey, IsUndefined } from '../utils';

/**
 * Add proxy interceptor
 * @param target
 * @returns {T}
 * @constructor
 */
export function AddProxyInterceptor<T extends object>(target: T) {
  const instanceProxyHandler: ProxyHandler<T> = {
    get: ProxyGetInterceptor,
    set: ProxySetInterceptor
  };
  // console.log('create proxy for ', target);
  return new Proxy(target, instanceProxyHandler);
}

/**
 * The **get** interceptor (es6)
 * @param target
 * @param p
 * @param receiver
 * @returns {any}
 * @constructor
 */
export function ProxyGetInterceptor<T extends object>(target: T, p: PropertyKey, receiver: any): any {

  const propertyKey = ToPropertyKey(p);
  const reflection = Reflection.getInstance(target, propertyKey);

  // ignore property without attributes
  if (!reflection) {
    return Reflect.get(target, p, receiver);
  }

  // ignore prototype interceptors and getter/setter
  // intercept by overloading ES5 prototype (static intercept)
  // if (!IsUndefined(reflection.descriptor)) {
  //   return Reflect.get(target, p, receiver);
  // }

  // intercept by implement ES6 proxy (dynamic intercept)
  if (!IsUndefined(reflection.descriptor) && reflection.descriptor.value) {
    return InterceptorFactory.createFunctionInterceptor(reflection.getAttributes(), reflection.descriptor.value);
  }

  // create field getter interceptor on the fly
  // TODO: get invocation from cache
  const invocation = InterceptorFactory.createGetterInterceptor(reflection.getAttributes(), target, propertyKey, receiver);

  // call getter
  return invocation.invoke([]);

}

/**
 * The **set** interceptor
 * @param target
 * @param p
 * @param value
 * @param receiver
 * @returns {boolean}
 * @constructor
 */
export function ProxySetInterceptor<T extends object>(target: T, p: PropertyKey, value: any, receiver: any): boolean {

  const propertyKey = ToPropertyKey(p);
  const reflection = Reflection.getInstance(target, propertyKey);

  // ignore property without attributes
  if (!reflection) {
    return Reflect.set(target, p, value, receiver);
  }

  // ignore prototype interceptors and getter/setter
  // if (!IsUndefined(reflection.descriptor)) {
  //   return Reflect.set(target, p, value, receiver);
  // }
  if (!IsUndefined(reflection.descriptor) && !reflection.descriptor.set) {
    return Reflect.set(target, p, value, receiver);
  }

  // create field setter interceptor on the fly
  const invocation = InterceptorFactory.createSetterInterceptor(reflection.getAttributes(), target, propertyKey, receiver);

  // call the interceptors
  return invocation.invoke([value]);
}
