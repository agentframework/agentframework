import { IAttribute, IInterceptor, IInvocation, decorateClassMethod } from '../../../src/lib';

export function methodDecorator() {
  return decorateClassMethod(new MethodDecoratorAttribute());
}

class MethodDecoratorAttribute implements IAttribute, IInterceptor {

  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }

  getInterceptor(): IInterceptor {
    return this;
  }

  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any {
    return invocation.invoke(parameters);
  }

}
