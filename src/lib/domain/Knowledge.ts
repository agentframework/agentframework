import { GetOrCreate } from '../../dependencies/core';
import { Domain } from './Domain';

export class DomainMetadata {
  private _domainType: Function | undefined;

  // domain contains all agent() instance
  private _domain: Domain | undefined;

  // key: Original Constructor, value: Agent Constructor
  private readonly _agents = new Map<Function, Function>();

  // key: Agent Constructor | Domain Agent Constructor, value: Original Constructor
  // private readonly _types = new Map<Function, Function>();

  // key: any, value: Domain
  private readonly _domains = new WeakMap<object, Domain>();

  // key: Domain & Original Constructor, value: Domain Agent Constructor
  private readonly _domainAgents = new Map<Domain, Map<Function, Function>>();

  // key: string, value: Constructor
  private readonly _extensibles = new Map<string, Function>();

  // private readonly _keys = new Set();

  // key: class
  private readonly _initializers = new Map<Function, Array<[Function, Function]>>();

  // key: class
  // private readonly _staticConstructors = new Set<Function>();

  // HasObject(key: any): boolean {
  //   return this._keys.has(key);
  // }

  // SetObject(key: any) {
  //   this._keys.add(key);
  // }

  // IsAgent<T extends Function>(type: T): boolean {
  //   return this._types.has(type);
  // }
  //
  // GetType<T extends Function>(type: T): T | undefined {
  //   return this._types.get(type) as T;
  // }
  //
  // RememberType(agent: Function, origin: Function): void {
  //   this._types.set(agent, origin);
  // }

  GetAgent(type: Function): Function | undefined {
    return this._agents.get(type);
  }

  RememberAgent(type: Function, newType: Function): void {
    this._agents.set(type, newType);
  }

  RememberDomainType(type: Function) {
    this._domainType = type;
  }

  GetLocalDomain(): Domain {
    if (this._domain) {
      return this._domain;
    }
    const domain = Reflect.construct(<Function>this._domainType, []);
    this._domain = domain;
    return domain;
  }

  GetDomain(key: object): Domain | undefined {
    return this._domains.get(key);
  }

  RememberDomain(key: object, domain: Domain): void {
    this._domains.set(key, domain);
  }

  /**
   * Domain agent cache
   */
  GetDomainAgent(domain: Domain, type: Function): Function | undefined {
    // map for all domain specified types
    const types = this._domainAgents.get(domain);
    return types && types.get(type);
  }

  /**
   * Domain agent cache
   */
  RememberDomainAgent(domain: Domain, type: Function, agent: Function): void {
    let types = this._domainAgents.get(domain);
    if (!types) {
      types = new Map<Function, Function>();
      this._domainAgents.set(domain, types);
    }
    types.set(type, agent);
    types.set(agent, agent);
    // make reverse query easy
    this.RememberDomain(agent, domain);
  }

  GetExtensible<T extends Function>(key: string): T | undefined {
    return <T>this._extensibles.get(key) || undefined;
  }

  SetExtensible<T extends Function>(key: string, type: T): T {
    this._extensibles.set(key, type);
    return type;
  }

  HasInitializer(type: Function): boolean {
    return this._initializers.has(type);
  }

  GetInitializers(type: Function): Array<[Function, Function]> | undefined {
    return this._initializers.get(type);
  }

  SetInitializers(type: Function, ctor: Array<[Function, Function]>): void {
    // console.log('cache', type, typeof type, '====>', ctor);
    this._initializers.set(type, ctor);
  }

  // IsStaticConstructorMarked(type: Function): boolean {
  //   return this._staticConstructors.has(type);
  // }
  //
  // MarkStaticConstructor(type: Function): void {
  //   this._staticConstructors.add(type);
  // }
}

class DomainMetadataHandler {
  // do nothing
}

export const Knowledge = GetOrCreate('Domain', () => new Proxy(new DomainMetadata(), new DomainMetadataHandler()));
