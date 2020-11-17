import { AgentFrameworkError, CreateAgent } from '../../../dependencies/core';
import { DomainAgentAttribute } from '../Attributes/DomainAgentAttribute';
import { DomainKnowledge } from '../DomainKnowledge';
import { AnyClass, Class } from '../ClassConstructor';
import { Domain } from '../Domain';

export function CreateDomainAgent<T>(domain: Domain, type: AnyClass<T>): Class<T> {
  // check owner domain
  const owner = DomainKnowledge.GetDomain(type);
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
  DomainKnowledge.RememberDomainAgent(domain, type, domainAgent);

  // console.log('create', newType.name, ' for domain', domain.name);
  return <Class<T>>domainAgent;
}
