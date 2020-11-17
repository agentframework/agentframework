/* tslint:disable */

import { CreateAgent, AgentAttribute, IsAgent, Reflector, decorateClass, AgentFrameworkError } from '../../../lib';
import { DisabledMetadataAttribute } from '../attributes/DisabledMetadataAttribute';

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

const Redis = (function () {
  return class {};
})();

describe('Decorate Agent', () => {
  describe('# MongoDB should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(MongoDB)).toBe(false);
    });

    it('re-upgrade agent', () => {
      expect(CreateAgent(MongoDB, new BadAgentAttribute())).toBe(MongoDB);
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

    it('new instance without name', () => {
      expect(() => {
        CreateAgent(Redis);
      }).toThrowError(AgentFrameworkError, 'InvalidClassName');
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
      expect(CreateAgent(MySQL, new BadAgentAttribute())).toBe(MySQL);
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
