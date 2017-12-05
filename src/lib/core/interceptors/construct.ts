import { Reflection } from '../reflection';
import { InterceptorFactory } from '../interceptor';
import { InMemoryDomain, IDomain, LocalDomain } from '../../domain';
import { AgentAttribute } from '../../agent';
import { IAttribute } from '../attribute';


/**
 * Create a proxied constructor (es6)
 * @param {Constructor} target
 * @param {Array<IAttribute>} attributes
 * @returns {Function}
 * @constructor
 */
export function AddConstructProxyInterceptor<Constructor extends Function>(target: Constructor, attributes?: Array<IAttribute>) {

  const customAttributes = attributes || Reflection.getAttributes(target);

  // MVP: Support multiple agent decoration on same class
  // if (customAttributes.length > 1) {
  //   throw new TypeError('Not Support Multiple Agent Decoration');
  // }

  // build a chain of constructors from decorated agent attributes
  // [ 1. User Defined, 2. User Defined, ... last. Origin Constructor ]
  // Pre-compile constructor interceptor to improve the performance
  const agentTypeConstructor = InterceptorFactory.createConstructInterceptor(customAttributes, target);

  const typeProxyHandler = {
    construct: (target: Function, parameters: any, receiver: any): object => {

      let domain: IDomain;

      if (parameters.length && parameters[0] instanceof InMemoryDomain) {
        domain = parameters[0] as IDomain;
      }
      else {
        domain = LocalDomain;
      }

      // invoke the cached chain
      const createdAgent = agentTypeConstructor.invoke(parameters);

      // register this agent to domain
      // do not register to domain if no identifier found
      customAttributes.forEach(attribute => {
        if (attribute instanceof AgentAttribute) {
          domain.registerAgent(attribute, createdAgent);
        }
      });

      // return the new created instance
      return createdAgent;

    }
  };
  return new Proxy(target, typeProxyHandler);
}
