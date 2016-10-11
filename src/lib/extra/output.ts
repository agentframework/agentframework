import { IAttribute, IInterceptor, IInvocation, decorateClassMembers } from '../core';


export function output() {
  return decorateClassMembers(new OutputAttribute());
}

class OutputAttribute implements IAttribute, IInterceptor {
  
  static type: string = 'agent.framework.output';
  
  constructor() {
  }
  
  beforeDecorate(target: Object|Function, targetKey?: string|symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }
  
  getType(): string {
    return OutputAttribute.type
  }
  
  getInterceptor(): IInterceptor {
    return this;
  }
  
  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any {
    try {
      return { result: invocation.invoke(parameters), error: null };
    }
    catch (err) {
      return { result: null, error: err };
    }
  }
}
