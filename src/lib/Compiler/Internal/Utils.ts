import { IInterceptor } from '../../Core/IInterceptor';
import { IAttribute } from '../../Core/IAttribute';
import { IInitializer } from '../../Core/IInitializer';

export function CanDecorate(
  attr: IAttribute,
  target: Object | Function,
  targetKey?: string | symbol,
  descriptor?: PropertyDescriptor | number
): boolean {
  return attr.beforeDecorate(target, targetKey, descriptor);
}

export function HasInterceptor(attribute: IAttribute): boolean {
  return !!attribute.interceptor;
}

export function HasInitializer(attribute: IAttribute): boolean {
  return !!attribute.initializer;
}

export function GetInterceptor(attribute: IAttribute): IInterceptor | undefined {
  let interceptor = attribute.interceptor;
  // do not intercept when got false, null, ''
  if (interceptor && 'function' === typeof interceptor.intercept && interceptor.intercept.length === 2) {
    return interceptor;
  }
  return undefined;
}

export function GetInitializer(attribute: IAttribute): IInitializer | undefined {
  let initializer = attribute.initializer;
  // do not intercept when got false, null, ''
  if (initializer && 'function' === typeof initializer.initialize && initializer.initialize.length === 2) {
    return initializer;
  }
  return undefined;
}
