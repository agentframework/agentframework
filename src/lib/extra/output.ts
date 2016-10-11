import { IAttribute, IInterceptor, IInvocation, decorateClassMembers } from '../core';


export function output(replaced: any) {
  return decorateClassMembers(new OutputAttribute(replaced));
}

class OutputAttribute implements IAttribute, IInterceptor {
  
  static type: string = 'agent.framework.output';
  
  constructor(private _value: any) {
  }

  get value(): boolean {
    return this._value
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
      const result = invocation.invoke(parameters);
      return { result, error: null };
    }
    catch(err) {
      return { result: null, error: err };
    }
  }
}
