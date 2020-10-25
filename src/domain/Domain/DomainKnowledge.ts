import { memorize } from '../../dependencies/core';
import { Domain } from './Domain';

/**
 * Knowledge of domain
 */
export class DomainKnowledge {
  static domain: Domain | undefined;

  // key: Constructor | instance, value: Owner Domain
  static get domains() {
    return memorize<WeakMap<Function | object, Domain>>(this, 'domains');
  }

  // key: Original Constructor, value: Agent Constructor
  static get agents() {
    return memorize<WeakMap<Function, Function>>(this, 'agents');
  }

  // key: Domain & Original Constructor, value: Domain Agent Constructor
  static get domainAgents() {
    return memorize<WeakMap<Domain, Map<Function, Function>>>(this, 'domainAgents');
  }

  // key: string, value: Constructor
  static get extensibles() {
    return memorize<Map<string, Function>>(this, 'extensibles', Map);
  }

  // key: class
  static get initializers() {
    return memorize<WeakMap<Function, Array<[Function, Function]>>>(this, 'initializers');
  }

  static GetLocalDomain(domainType: Function): Domain {
    if (this.domain) {
      return this.domain;
    }
    const domain = Reflect.construct(domainType, []);
    this.domain = domain;
    return domain;
  }

  static GetAgent<T extends Function>(type: T): T | undefined {
    return this.agents.get(type) as T | undefined;
  }
  static RememberAgent<T extends Function>(type: T, agent: T): void {
    this.agents.set(type, agent);
  }

  static GetDomain(key: object): Domain | undefined {
    return this.domains.get(key);
  }

  static RememberDomain(key: object, domain: Domain): void {
    this.domains.set(key, domain);
  }

  /**
   * Domain agent cache
   */
  static GetDomainAgent(domain: Domain, type: Function): Function | undefined {
    // map for all domain specified types
    const types = this.domainAgents.get(domain);
    return types && types.get(type);
  }

  /**
   * Domain agent cache
   */
  static RememberDomainAgent(domain: Domain, type: Function, agent: Function): void {
    let types = this.domainAgents.get(domain);
    if (!types) {
      types = new Map<Function, Function>();
      this.domainAgents.set(domain, types);
    }
    types.set(type, agent);
    types.set(agent, agent);
    // make reverse query easy
    DomainKnowledge.RememberDomain(agent, domain);
  }

  static GetExtensible<T extends Function>(key: string): T | undefined {
    return <T>this.extensibles.get(key) || undefined;
  }

  static SetExtensible<T extends Function>(key: string, type: T): T {
    this.extensibles.set(key, type);
    return type;
  }

  static HasInitializer(type: Function): boolean {
    return this.initializers.has(type);
  }

  static GetInitializers(type: Function): Array<[Function, Function]> | undefined {
    return this.initializers.get(type);
  }

  static SetInitializers(type: Function, ctor: Array<[Function, Function]>): void {
    // console.log('cache', type, typeof type, '====>', ctor);
    this.initializers.set(type, ctor);
  }
}
