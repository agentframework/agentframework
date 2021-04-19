import { Constructor } from '../Constructor';
import { Attribute } from '../Interfaces/Attribute';
import { Interceptor } from '../Interfaces/Interceptor';
import { Interceptors } from '../Knowledge';

/**
 * Set custom interceptor for giving type of attribute
 */
export function SetCustomInterceptor(
  type: Constructor<Attribute>,
  custom: Constructor<Interceptor>,
  meta?: unknown
): void {
  Interceptors.v1.set(type, [custom, meta]);
}

/**
 * Get custom interceptor
 */
export function GetCustomInterceptor(type: Constructor<Attribute>): [Constructor<Interceptor>, unknown?] | undefined {
  return Interceptors.v1.get(type);
}

/**
 * Remove custom interceptor
 */
export function RemoveCustomInterceptor(type: Constructor<Attribute>): void {
  Interceptors.v1.delete(type);
}

/**
 * Get interceptor for giving type of attribute
 */
export function GetInterceptor(attribute: Attribute): Interceptor | undefined {
  const interceptor = attribute.interceptor;
  if (interceptor && 'object' === typeof interceptor && 'function' === typeof interceptor.intercept) {
    return interceptor;
  }
  const found = Interceptors.v1.get(attribute.constructor);
  // console.log('find', attribute.constructor, '===', interceptorType)
  if (found) {
    return Reflect.construct(found[0], [attribute, found[1]]);
  }
  return;
}

/**
 * Return true if giving attribute has interceptor
 */
export function HasInterceptor(attribute: Attribute): boolean {
  // we can not use attribute['interceptor'] because the interceptor maybe a getter field
  // the Reflect.has() will checks the key on all prototypes of the attribute
  if (Reflect.has(attribute, 'interceptor')) {
    return true;
  }
  //console.log('has', attribute.constructor, '===',Reflect.has(attribute, 'interceptor'),'||', Knowledge.interceptors.has(attribute.constructor))
  return Interceptors.v1.has(attribute.constructor);
}
