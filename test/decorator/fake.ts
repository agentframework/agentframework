import { IAttribute, IInterceptor, decorateClassMember } from '../../src/lib';
import { decorateClass, decorateClassMethod, decorateClassProperty } from '../../src/lib/core/decorator';

export function fakeClassMemberDecorator() {
  return decorateClassMember(new PropertyDecoratorAttribute());
}

export function fakeClassDecorator() {
  return decorateClass(new PropertyDecoratorAttribute());
}

export function fakeClassMethodDecorator() {
  return decorateClassMethod(new PropertyDecoratorAttribute());
}

export function fakeClassPropertyDecorator() {
  return decorateClassProperty(new PropertyDecoratorAttribute());
}

class PropertyDecoratorAttribute implements IAttribute {

  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    return false;
  }

  getInterceptor(): IInterceptor {
    throw new TypeError('Fake decorator do not have interceptor')
  }

}
