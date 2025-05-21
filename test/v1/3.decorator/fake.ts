/* tslint:disable */

import { Attribute, Interceptor, decorateMember, decorateClass, decorateParameter } from '../../../lib/dependencies/agent';

export function fakeClassMemberDecorator() {
  return decorateMember(new PropertyDecoratorAttribute());
}

export function fakeClassDecorator() {
  return decorateClass(new PropertyDecoratorAttribute());
}

export function fakeClassMethodDecorator() {
  return decorateMember(new PropertyDecoratorAttribute());
}

export function fakeClassPropertyDecorator() {
  return decorateMember(new PropertyDecoratorAttribute());
}

export function fakeParameterDecorator() {
  return decorateParameter(new PropertyDecoratorAttribute());
}

export class PropertyDecoratorAttribute implements Attribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return false;
  }

  getInterceptor(): Interceptor {
    throw new TypeError('Fake decorator do not have interceptor');
  }
}
