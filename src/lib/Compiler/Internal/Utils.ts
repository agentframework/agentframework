import { IInterceptor } from '../../Core/IInterceptor';
import { IAttribute } from '../../Core/IAttribute';
import { IInitializer } from '../../Core/IInitializer';
import { IsFunction } from '../../Core/Utils';

export function CanDecorate(
  attribute: IAttribute,
  target: Object | Function,
  targetKey?: string | symbol,
  descriptor?: PropertyDescriptor | number
): boolean {
  if (!attribute) {
    return false;
  }
  if (typeof attribute.beforeDecorate === 'function') {
    return attribute.beforeDecorate(target, targetKey, descriptor);
  }
  return true;
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
  if (interceptor && IsFunction(interceptor.intercept) && interceptor.intercept.length === 2) {
    return interceptor;
  }
  return undefined;
}

export function GetInitializer(attribute: IAttribute): IInitializer | undefined {
  let initializer = attribute.initializer;
  // do not intercept when got false, null, ''
  if (initializer && IsFunction(initializer.initialize) && initializer.initialize.length === 2) {
    return initializer;
  }
  return undefined;
}
