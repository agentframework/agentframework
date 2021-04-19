import { AbstractConstructor } from '../../../dependencies/core';
import { Domain } from '../Domain';
import { DomainAgents } from '../DomainKnowledge';

export function GetDomainAgent<T extends AbstractConstructor<any>>(domain: Domain, type: T): T | undefined {
  const domains = DomainAgents.v1.get(type);
  return domains ? (domains.get(domain) as T | undefined) : undefined;
}
