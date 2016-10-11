import { decorateClass, IAttribute, IInterceptor, IInvocation } from './core';

/**
 * Define an agent
 * @param identifier
 * @returns {(target:Constructor)=>(void|Constructor)}
 */
export function agent(identifier: string) {
  return decorateClass(new AgentAttribute(identifier));
}

/**
 * AgentAttribute
 */
class AgentAttribute implements IAttribute, IInterceptor {
  
  static type: string = 'agent.framework.agent';
  
  constructor(private _identifier: string) {
  }
  
  get identifier(): string {
    return this._identifier
  }
  
  beforeDecorate(target: Object|Function, targetKey?: string|symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }
  
  getType(): string {
    return AgentAttribute.type
  }
  
  getInterceptor(): IInterceptor {
    return this;
  }
  
  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any {
    // console.log('create new ', invocation.target, parameters);
    return invocation.invoke(parameters);
  }
  
}
