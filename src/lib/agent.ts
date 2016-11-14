import { decorateClass, IAttribute, IInterceptor, IInvocation } from './core';
import { AddProxyInterceptor } from './core/interceptors/proxy';
import { Domain, DOMAIN, LocalDomain } from './domain';
import { Reflection } from './core/reflection';
import { InjectAttribute } from './extra/inject';

const PROXIED = Symbol('agent.framework.proxy');

export type Agent = new <TFunction extends Function>(...parameters: Array<any>) => TFunction;

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

  getInterceptor(): IInterceptor {
    return this;
  }

  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any {

    let domain: Domain<any>;
    let agent;

    if (parameters.length && parameters[0] instanceof Domain) {
      domain = parameters[0] as Domain<any>;
    }
    else {
      domain = LocalDomain;
    }

    agent = invocation.invoke(parameters);

    // find metadata
    const metadata = Reflection.metadata.getAll(Reflect.getPrototypeOf(agent));

    // injector attributes for this class
    if (metadata) {
      metadata.forEach((attributes: Reflection, key: string) => {

        const injectors = attributes.getAttributes()
          .filter(attribute => attribute instanceof InjectAttribute);

        if (injectors.length) {
          const injector = injectors[0] as InjectAttribute;
          // console.log('injecting', injector.typeOrIdentifier, 'to', key);
          if (typeof injector.typeOrIdentifier === 'string') {
            // lookup from domain
            const injected = domain.getAgent(injector.typeOrIdentifier);
            if (injected != null) {
              Reflect.set(agent, key, injected);
            }
            else {
              throw new TypeError(`${injector.typeOrIdentifier} not found`);
            }
          }
          else {
            // create a new instance
            const injected = Reflect.construct(injector.typeOrIdentifier, []);
            // console.log('inject', injected);
            Reflect.set(agent, key, injected);
          }
        }

      });
    }

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
    if (!Reflect.get(agent, PROXIED)) {
      // intercept by implement ES6 proxy (dynamic intercept)
      agent = AddProxyInterceptor(agent);
      Reflect.set(agent, PROXIED, true);
    }

    // register this agent with domain
    // do not register to domain if no identifier found
    if (this.identifier) {
      if (domain.hasAgent(this.identifier)) {
        throw new TypeError(`Duplicate agent identifier: ${this.identifier}`);
      }
      else {
        // console.log(`DEBUG: registering agent ${invocation.target.name} (${this.identifier})...`);
        // register service to directory for future use
        domain.addAgent(this.identifier, agent);
        Reflect.set(agent, DOMAIN, domain);
      }
    }

    return agent;
  }

}
