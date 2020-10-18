/* tslint:disable */

import { Attribute, Interceptor, Invocation, decorateClassProperty, Arguments } from '../../../lib';

export function methodDecorator() {
  return decorateClassProperty(new MethodDecoratorAttribute());
}

class MethodDecoratorAttribute implements Attribute, Interceptor {

  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }

  getInterceptor(): Interceptor {
    return this;
  }

  intercept(invocation: Invocation, parameters: Arguments, receiver: any): any {
    return invocation.invoke(parameters, receiver);
  }

}
