import { IAttribute, IInterceptor, IInvocation, decorateClassProperty } from '../../src/lib';


export function propertyDecorator() {
  return decorateClassProperty(new PropertyDecoratorAttribute());
}

class PropertyDecoratorAttribute implements IAttribute {

  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }

}
