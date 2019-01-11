import { IAttribute } from '../../Core/IAttribute';

export function CanDecorate(
  attr: IAttribute,
  target: Object | Function,
  targetKey?: string | symbol,
  descriptor?: PropertyDescriptor | number
): boolean {
  return attr.beforeDecorate(target, targetKey, descriptor);
}

export function HasInterceptor(attribute: IAttribute): boolean {
  return Reflect.has(attribute, 'interceptor');
}

export function HasInitializer(attribute: IAttribute): boolean {
  return Reflect.has(attribute, 'initializer');
}
