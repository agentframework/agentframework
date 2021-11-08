/* tslint:disable */

import { Attribute, Interceptor, Invocation, decorateMember, Arguments } from '../../../src/dependencies/agent';

export function methodDecorator() {
  return decorateMember(new MethodDecoratorAttribute());
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
