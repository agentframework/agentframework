import { AgentFrameworkError, CreateAgent } from '../../../dependencies/core';
import { DomainAgentAttribute } from '../Attributes/DomainAgentAttribute';
import { Domain } from '../Domain';
import { GetDomain } from '../Helpers/GetDomain';
import { RememberDomain } from '../Helpers/RememberDomain';

export function CreateDomainAgent<T extends Function>(domain: Domain, type: T): T {
  // check owner domain
  const owner = GetDomain(type);
  if (owner && domain !== owner) {
    throw new AgentFrameworkError('NotSupportCreateAgentForOtherDomain');
  }

  // 1. get original type if giving type is an agent type
  // const origin = Knowledge.GetType(type);
  // if (origin) {
  //   // target is an agent already
  //   // set the target to origin type to recreate this
  //   // so create another proxy from this origin class
  //   console.log('exists domain type', type);
  //   type = origin;
  // }

  // if (typeof domain.constructor.name === 'function') {
  //   debugger;
  //   console.log('<< CREATE >>', domain.constructor.name, '====>', type.name);
  // }

  // upgrade to Agent only if interceptor or initializer found
  const domainAgent = CreateAgent(type, new DomainAgentAttribute(domain));
  // console.log('found', domain, type, newType)

  // const name = Reflector(type).name;
  // const factory = Function(name, [`return`, `class`, `${name}$`, `extends`, name, '{}'].join(' '));
  // const newType = factory(type);
  // Knowledge.RememberType(domainAgent, type);
  // DomainKnowledge.RememberDomainAgent(domain, type, domainAgent);
  RememberDomain(domainAgent, domain);

  // console.log('create', newType.name, ' for domain', domain.name);
  return domainAgent;
}
