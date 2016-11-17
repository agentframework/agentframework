import { Reflection } from '../reflection';
import { InterceptorFactory } from '../interceptor';
import { Domain, LocalDomain } from '../../domain';
import { InjectAttribute } from '../../extra/inject';
import { AgentAttribute } from '../../agent';
import { AGENT_DOMAIN } from '../utils';
import { Metadata } from '../metadata';

export function AddConstructProxyInterceptor<Constructor extends Function>(target: Constructor) {
  const typeProxyHandler = {
    construct: ConstructInterceptor
  };
  return new Proxy(target, typeProxyHandler);
}

export function ConstructInterceptor<T>(target: T, parameters: ArrayLike<any>, receiver: any): any {

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

  // find metadata
  Metadata.getAll(Reflect.getPrototypeOf(rawAgent)).forEach((reflection: Reflection, key: string) => {
    reflection.getAttributes(InjectAttribute).forEach((injector: InjectAttribute) => {
      let injected = domain.getAgent(injector.typeOrIdentifier);
      Reflect.set(rawAgent, key, injected);
    });
  });

  // do not register to domain if no identifier found
  customAttributes.forEach(attribute => {
    if (attribute instanceof AgentAttribute) {
      domain.registerAgent(attribute, rawAgent);
    }
  });

  Reflect.set(rawAgent, AGENT_DOMAIN, domain);

  // return the new class constructor
  return rawAgent;

}
