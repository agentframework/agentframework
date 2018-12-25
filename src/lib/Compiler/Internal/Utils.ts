import { IInterceptor } from '../../Core/IInterceptor';
import { IAttribute } from '../../Core/IAttribute';
import { IInitializer } from '../../Core/IInitializer';
import { IsFunction } from '../../Core/Internal/Utils';

export function CanDecorate(
  attribute: IAttribute,
  target: Object | Function,
  targetKey?: string | symbol,
  descriptor?: PropertyDescriptor
): boolean {
  if (!attribute) {
    return false;
  }
  if (typeof attribute.beforeDecorate === 'function') {
    return attribute.beforeDecorate(target, targetKey, descriptor);
  }
  return true;
}

export function GetInterceptor(attribute: IAttribute): IInterceptor | undefined {
  if (attribute.getInterceptor) {
    const interceptor = attribute.getInterceptor();
    // do not intercept when got false, null, ''
    if (!!interceptor && IsFunction(interceptor.intercept) && interceptor.intercept.length === 2) {
      return interceptor;
    }
  }
  return undefined;
}

export function GetInitializer(attribute: IAttribute): IInitializer | undefined {
  if (attribute.getInitializer) {
    const initializer = attribute.getInitializer();
    // do not intercept when got false, null, ''
    if (!!initializer && IsFunction(initializer.initialize) && initializer.initialize.length === 2) {
      return initializer;
    }
  }
  return undefined;
}
