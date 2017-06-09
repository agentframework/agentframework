import { Reflection } from '../reflection';
import { InterceptorFactory } from '../interceptor';
import { Domain, LocalDomain } from '../../domain';
import { InjectAttribute } from '../../extra/inject';
import { Agent, AgentAttribute } from '../../agent';
import { AGENT_DOMAIN, IsFunction } from '../utils';
import { Lookup } from '../lookup';
import { ReadyAttribute } from '../../extra/ready';

export function AddConstructProxyInterceptor<Constructor extends Function>(target: Constructor) {
  const typeProxyHandler = {
    construct: ConstructInterceptor
  };
  return new Proxy(target, typeProxyHandler);
}

export function ConstructInterceptor<T extends Agent>(target: T, parameters: ArrayLike<any>, receiver: any): any {

  const customAttributes = Reflection.getAttributes(target);
  let domain: Domain;

  if (parameters.length && parameters[0] instanceof Domain) {
    domain = parameters[0] as Domain;
  }
  else {
    domain = LocalDomain;
  }

  // if (customAttributes.length > 1) {
  //   throw new TypeError('Not Support Multiple Agent Decoration');
  // }

  const agentTypeConstructor = InterceptorFactory.createConstructInterceptor(customAttributes, target, receiver);

  const rawAgent = agentTypeConstructor.invoke(parameters);

  // register this agent to domain
  // do not register to domain if no identifier found
  customAttributes.forEach(attribute => {
    if (attribute instanceof AgentAttribute) {
      domain.registerAgent(attribute, rawAgent);
    }
  });

  Reflect.set(rawAgent, AGENT_DOMAIN, domain);

  // injection
  Lookup.attributes<InjectAttribute>(target, InjectAttribute)
    .forEach((value: Array<InjectAttribute>, key: string) => {
      value.forEach(injector => {
        let injected = domain.getAgent(injector.typeOrIdentifier);
        Reflect.set(rawAgent, key, injected);
      });
    });

  // invoke @ready
  Lookup.attributes<ReadyAttribute>(target, ReadyAttribute)
    .forEach((value: Array<ReadyAttribute>, key: string) => {
      if (value.length) {
        const readyFn = Reflect.get(rawAgent, key);
        if (readyFn && IsFunction(readyFn)) {
          Reflect.apply(readyFn, rawAgent, []);
        }
      }
    });

  // return the new class constructor
  return rawAgent;

}
