import { IAttribute, IInterceptor, decorateClassMember } from '../../src/lib';

export function fakeDecorator() {
  return decorateClassMember(new PropertyDecoratorAttribute());
}

class PropertyDecoratorAttribute implements IAttribute {
  
  beforeDecorate(target: Object|Function, targetKey?: string|symbol, descriptor?: PropertyDescriptor): boolean {
    return false;
  }
  
  getInterceptor(): IInterceptor {
    throw new TypeError('Fake decorator do not have interceptor')
  }
  
}
