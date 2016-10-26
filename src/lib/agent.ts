import { decorateClass, IAttribute, IInterceptor, IInvocation } from './core';
import { AddProxyInterceptor } from './core/interceptors/proxy';
import { Reflection } from './core/reflection';

/**
 * Define an agent
 * @returns {(target:Constructor)=>(void|Constructor)}
 */
export function agent(identifier?: any) {
  return decorateClass(new AgentAttribute(identifier));
}

/**
 * AgentAttribute
 */
export class AgentAttribute implements IAttribute, IInterceptor {

  constructor(private _identifier?: any) {
  }

  get identifier(): any {
    return this._identifier;
  }

  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
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
        .filter(reflection => !reflection.descriptor)
        .filter(reflection => reflection.hasAttributes());

      // do not proxy if no field interceptors detected
      if (fieldInterceptors.length) {
        // Proxy the current agent object
        agent = AddProxyInterceptor(agent);
      }
    }

    // TODO: register this agent with domain

    // console.log(`DEBUG: registering agent ${this.identifier}...`);

    return agent;
  }

}
