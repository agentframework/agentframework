import { Reflection } from '../reflection';
import { InterceptorFactory } from '../interceptor';
import { InMemoryDomain, IDomain, LocalDomain } from '../../domain';
import { Agent, AgentAttribute } from '../../agent';
import { AGENT_DOMAIN } from '../utils';
import { IAttribute } from '../attribute';


/**
 * Create a proxied constructor (es6)
 * @param {Constructor} target
 * @returns {Constructor}
 * @constructor
 */
export function AddConstructProxyInterceptor<Constructor extends Agent>(target: Constructor) {
  const typeProxyHandler = {
    construct: ConstructInterceptor
  };
  return new Proxy(target, typeProxyHandler);
}


/**
 * Main function to create an agent
 */
export function ConstructInterceptor(target: Agent, parameters: any, receiver: any): object {

  const customAttributes = Reflection.getAttributes(target);
  let domain: IDomain;

  if (parameters.length && parameters[0] instanceof InMemoryDomain) {
    domain = parameters[0] as IDomain;
  }
  else {
    domain = LocalDomain;
  }

  // [Valuable Feature] Support multiple agent decoration on same class
  // if (customAttributes.length > 1) {
  //   throw new TypeError('Not Support Multiple Agent Decoration');
  // }

  // TODO: [Most Valuable Feature] Can we inject the required fields before construct the object?
  
  // build a chain of constructors from decorated agent attributes
  // [ 1. User Defined, 2. User Defined, ... last. Origin Constructor ]
  const agentTypeConstructor = InterceptorFactory.createConstructInterceptor(customAttributes, target, receiver);

  // invoke this chain
  const rawAgent = agentTypeConstructor.invoke(parameters);
  
  // remember the domain of this agent, to implement some advanced features
  Reflect.set(rawAgent, AGENT_DOMAIN, domain);
  
  // register this agent to domain
  // do not register to domain if no identifier found
  customAttributes.forEach(attribute => {
    if (attribute instanceof AgentAttribute) {
      domain.registerAgent(attribute, rawAgent);
    }
  });

  // return the new created instance
  return rawAgent;

}
