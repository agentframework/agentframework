import { IAttribute, IInterceptor, IInvocation, decorateClassProperty } from '../../src/lib';


export function propertyDecorator() {
  return decorateClassProperty(new PropertyDecoratorAttribute());
}

class PropertyDecoratorAttribute implements IAttribute, IInterceptor {
  
  beforeDecorate(target: Object|Function, targetKey?: string|symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }
  
  getInterceptor(): IInterceptor {
    return this;
  }
  
  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any {
    return invocation.invoke(parameters);
  }
  
}
