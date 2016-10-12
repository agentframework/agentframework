import { decorateClass, IAttribute, IInterceptor, IInvocation } from './core';
import { AddProxyInterceptor } from './core/interceptors/proxy';

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
  
  constructor(private _identifier: string) {
  }
  
  get identifier(): string {
    return this._identifier
  }
  
  beforeDecorate(target: Object|Function, targetKey?: string|symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }
  
  getInterceptor(): IInterceptor {
    return this;
  }
  
  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any {
    
    // TODO: register this agent with domain
    const agent = invocation.invoke(parameters);
    
    // Proxy the current agent object
    return AddProxyInterceptor(agent);
    
  }
  
}
