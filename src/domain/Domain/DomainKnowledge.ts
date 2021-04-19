import { Remember } from '../../dependencies/core';
import { Domain } from './Domain';

/**
 * Get agent of giving type
 */
export class Agents {
  // key: Original Constructor, value: Agent Constructor
  static get v1() {
    return Remember<WeakMap<Function, Function>>(this, 'v1', Map);
  }
}

/**
 * Get domain of giving instance or type
 */
export class Domains {
  // key: Agent Type,             value: Domain instance
  // key: Agent Type Prototype,   value: Domain instance
  // key: Domain instance,        value: Domain instance
  // key: Domain Type Prototype,  value: Domain Type Prototype
  static get v1() {
    return Remember<WeakMap<Function | object, Domain | undefined>>(this, 'v1');
  }
}

/**
 * Get agent of giving domain and type
 */
export class DomainAgents {
  // key: Original Constructor, value: Agent Constructor
  static get v1() {
    return Remember<WeakMap<Function, WeakMap<Domain, Function>>>(this, 'v1', Map);
  }
}

/**
 * Get type of giving string id
 */
export class NamedTypes {
  // key: string, value: Constructor
  static get v1() {
    return Remember<Map<string, unknown>>(this, 'v1', Map);
  }
}

/**
 * Get initializers of giving type
 */
export class Initializers {
  // key: class, value: [Initializer Function, Class]
  static get v1() {
    return Remember<WeakMap<Function, Array<[Function, Function]>>>(this, 'v1');
  }
}
