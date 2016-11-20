import { decorateClass, IAttribute, IInterceptor, IInvocation } from './core';
import { AddProxyInterceptor } from './core/interceptors/proxy';
import { ORIGIN_INSTANCE, AGENT_DOMAIN } from './core/utils';
import { ReadyAttribute } from './extra/ready';
import { Reflection } from './core/reflection';
import { Metadata } from './core/metadata';

export type Agent = new <Constructor extends Function>(...parameters: Array<any>) => Constructor;

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

  constructor(private _identifier?: string) {
  }

  get identifier(): string | null {
    return this._identifier;
  }

  getInterceptor(): IInterceptor {
    return this;
  }

  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any {

    let originalAgent = invocation.invoke(parameters);

    // // NOTE: In order to improve the performance, do not proxy if no field interceptors detected
    // // intercept by overloading ES5 prototype (static intercept)
    // const interceptorDefinitions = Reflection.metadata.getAll(invocation.target.prototype);
    // if (interceptorDefinitions) {
    //
    //   const fieldInterceptors = [...interceptorDefinitions.values()]
    //     .filter(reflection => !reflection.descriptor)
    //     .filter(reflection => reflection.hasAttributes());
    //
    //   // do not proxy if no field interceptors detected
    //   if (fieldInterceptors.length) {
    //     // Proxy the current agent object
    //     agent = AddProxyInterceptor(agent);
    //   }
    //
    // }

    // only proxy one time
    if (!Reflect.has(originalAgent, ORIGIN_INSTANCE)) {

      // intercept by implement ES6 proxy (dynamic intercept)
      const domain = Reflect.get(originalAgent, AGENT_DOMAIN);
      const upgradedAgent = AddProxyInterceptor(originalAgent);
      Reflect.set(upgradedAgent, ORIGIN_INSTANCE, originalAgent);
      Reflect.set(upgradedAgent, AGENT_DOMAIN, domain);

      const readyList = [];

      // find metadata
      Metadata.getAll(Reflect.getPrototypeOf(originalAgent)).forEach((reflection: Reflection, key: string) => {
        if (reflection.getAttributes(ReadyAttribute).length) {
          readyList.push(key);
        }
      });

      // execute agent hook: -> READY
      if (readyList.length) {
        readyList.forEach(ready => {
          const readyFn = Reflect.get(upgradedAgent, ready);
          if (typeof readyFn === 'function') {
            Reflect.apply(readyFn, upgradedAgent, []);
          }
        });
      }

      return upgradedAgent;
    }

    return originalAgent;
  }

}
