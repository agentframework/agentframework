/* tslint:disable */

import { IsAgent, Reflector, decorateClass } from '../../../src/dependencies/core';
import { DisabledMetadataAttribute } from '../1.attributes/DisabledMetadataAttribute';
import { AgentAttribute, CreateAgent } from '../../../src/dependencies/core';

class BadAgentAttribute extends AgentAttribute {
  get interceptor() {
    return 1 as any;
  }
}

class BadAgentAttribute2 extends AgentAttribute {
  get interceptor() {
    return undefined as any;
  }
}

@decorateClass(new BadAgentAttribute())
class MongoDB {
  connection: any;
  constructor() {}

  connect() {
    return 'connected';
  }
}

@decorateClass(new BadAgentAttribute2())
class MySQL {
  connection: any;
  constructor() {}

  connect() {
    return 'connected';
  }
}

describe('Decorate Agent', () => {
  describe('# MongoDB should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(MongoDB)).toBe(false);
    });

    it('re-upgrade agent', () => {
      expect(CreateAgent(MongoDB, new BadAgentAttribute()).prototype).toBeInstanceOf(MongoDB);
    });

    it('upgrade agent with not attribute', () => {
      @decorateClass(new DisabledMetadataAttribute())
      class SQLServer {}

      const SQL = CreateAgent(SQLServer, new AgentAttribute());
      expect(IsAgent(SQL)).toBe(true);
    });

    it('new instance', () => {
      const db = new MongoDB();
      expect(db instanceof MongoDB).toBe(true);
      expect(Reflect.getPrototypeOf(db)).toBe(MongoDB.prototype);
    });

    it('construct instance', () => {
      const db = Reflect.construct(MongoDB, []);
      expect(db instanceof MongoDB).toBe(true);
      expect(Reflect.getPrototypeOf(db)).toBe(MongoDB.prototype);
    });
  });

  describe('# MongoDB2 should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(MySQL)).toBe(false);
    });

    it('re-upgrade agent', () => {
      expect(CreateAgent(MySQL, new BadAgentAttribute()).prototype).toBeInstanceOf(MySQL);
    });

    it('new instance', () => {
      const db = new MySQL();
      expect(db instanceof MySQL).toBe(true);
      expect(Reflect.getPrototypeOf(db)).toBe(MySQL.prototype);
    });

    it('construct instance', () => {
      const db = Reflect.construct(MySQL, []);
      expect(db instanceof MySQL).toBe(true);
      expect(Reflect.getPrototypeOf(db)).toBe(MySQL.prototype);
    });
  });

  describe('# should not able to', () => {
    it('get agent attribute', () => {
      const items = Reflector(MySQL).getOwnAttributes(AgentAttribute);
      expect(items.length).toBe(1);
    });
  });
});
