import {
  IAttribute,
  IInterceptor,
  decorateClassMember,
  decorateClass,
  decorateClassMethod,
  decorateClassField, decorateParameter
} from '../../../src/lib';


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
  return decorateClassField(new PropertyDecoratorAttribute());
}

export function fakeParameterDecorator() {
  return decorateParameter(new PropertyDecoratorAttribute());
}

export class PropertyDecoratorAttribute implements IAttribute {

  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    return false;
  }

  getInterceptor(): IInterceptor {
    throw new TypeError('Fake decorator do not have interceptor')
  }

}

