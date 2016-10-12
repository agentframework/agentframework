import { IAttribute, IInterceptor, IInvocation, decorateClassMembers } from '../core';


export function output() {
  return decorateClassMembers(new OutputAttribute());
}

class OutputAttribute implements IAttribute, IInterceptor {
  
  constructor() {
  }
  
  beforeDecorate(target: Object|Function, targetKey?: string|symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }
  
  getInterceptor(): IInterceptor {
    return this;
  }
  
  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any {
    console.log('output', invocation.target, 'method',invocation.method)
    try {
      return { result: invocation.invoke(parameters), error: null };
    }
    catch (err) {
      return { result: null, error: err };
    }
  }
}
