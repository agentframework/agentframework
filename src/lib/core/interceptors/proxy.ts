import { Reflection } from '../reflection';
import { InterceptorFactory } from '../interceptor';
import { ToPropertyKey, IsNumber, IsUndefined } from '../utils';

/**
 * Add proxy interceptor
 * @param target
 * @returns {T}
 * @constructor
 */
export function AddProxyInterceptor<T>(target: T) {
  const instanceProxyHandler: ProxyHandler<T> = {
    get: ProxyGetInterceptor,
    set: ProxySetInterceptor
  };
  return new Proxy(target, instanceProxyHandler);
}

/**
 * The **get** interceptor
 * @param target
 * @param p
 * @param receiver
 * @returns {any}
 * @constructor
 */
function ProxyGetInterceptor<T>(target: T, p: PropertyKey, receiver: any): any {
  
  const propertyKey = ToPropertyKey(p);
  const reflection = Reflection.getInstance(target, propertyKey);

  // ignore property without attributes
  if (!reflection) {
    return Reflect.get(target, p, receiver);
  }
  
  // ignore prototype interceptors and getter/setter
  if (!IsUndefined(reflection.descriptor)) {
    return Reflect.get(target, p, receiver);
  }
  
  // create field getter interceptor on the fly
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
function ProxySetInterceptor<T>(target: T, p: PropertyKey, value: any, receiver: any): boolean {
  
  const propertyKey = ToPropertyKey(p);
  const reflection = Reflection.getInstance(target, propertyKey);
  
  // ignore property without attributes
  if (!reflection) {
    return Reflect.set(target, p, value, receiver);
  }
  
  // ignore prototype interceptors and getter/setter
  if (!IsUndefined(reflection.descriptor)) {
    return Reflect.set(target, p, value, receiver);
  }
  
  // create field setter interceptor on the fly
  const invocation = InterceptorFactory.createSetterInterceptor(reflection.getAttributes(), target, propertyKey, receiver);
  
  // call the interceptors
  return invocation.invoke([value]);
}
