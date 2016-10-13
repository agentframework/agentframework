import { decorateClass, IAttribute, IInterceptor, IInvocation } from './core';
import { AddProxyInterceptor } from './core/interceptors/proxy';
import { Reflection } from './core/reflection';
import { IsUndefined } from './core/utils';

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
    
    let agent = invocation.invoke(parameters);
    
    // NOTE: In order to improve the performance, do not proxy if no field interceptors detected
    const interceptorDefinitions = Reflection.metadata.getAll(invocation.target.prototype);
    if (interceptorDefinitions) {
      
      const fieldInterceptors = [...interceptorDefinitions.values()]
        .filter(reflection=>!reflection.descriptor)
        .filter(reflection=>reflection.hasAttributes());
    
      // do not proxy if no field interceptors detected
      if (fieldInterceptors.length) {
        // Proxy the current agent object
        agent = AddProxyInterceptor(agent);
      }
    }
    // TODO: register this agent with domain
    return agent;
  }
  
}
