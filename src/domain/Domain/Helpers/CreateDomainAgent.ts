import { AbstractConstructor, AgentFrameworkError, ClassAttribute, CreateAgent } from '../../../dependencies/core';
import { DomainAgentAttribute } from '../Attributes/DomainAgentAttribute';
import { Domain } from '../Domain';
import { GetDomain } from './GetDomain';
import { RememberDomain } from './RememberDomain';
import { RememberDomainAgent } from './RememberDomainAgent';

export function CreateDomainAgent<T extends AbstractConstructor<any>>(
  domain: Domain,
  type: T,
  strategy?: ClassAttribute
): T {
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

  const createAgentStrategy =
    strategy ||
    domain.getAgent(DomainAgentAttribute) ||
    Reflect.construct(domain.getType(DomainAgentAttribute) || DomainAgentAttribute, [domain]);

  // upgrade to Agent only if interceptor or initializer found
  const newCreatedAgent = CreateAgent(type, createAgentStrategy);
  // console.log('found', domain, type, newType)
  // const name = Reflector(type).name;
  // const factory = Function(name, [`return`, `class`, `${name}$`, `extends`, name, '{}'].join(' '));
  // const newType = factory(type);
  // Knowledge.RememberType(domainAgent, type);
  // DomainKnowledge.RememberDomainAgent(domain, type, domainAgent);
  RememberDomain(newCreatedAgent, domain);
  RememberDomain(newCreatedAgent.prototype, domain);

  RememberDomainAgent(domain, type, newCreatedAgent);
  RememberDomainAgent(domain, newCreatedAgent, newCreatedAgent);
  // this._upgrades.set(type, newCreatedAgent);
  // this._upgrades.set(newCreatedAgent, newCreatedAgent);

  return newCreatedAgent;
}
