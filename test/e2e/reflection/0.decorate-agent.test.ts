/* tslint:disable */

import { Agent, AgentAttribute, IsAgent, Reflector, decorateAgent } from '../../../src/lib';
import { DisabledMetadataAttribute } from '../attributes/DisabledMetadataAttribute';

class BadAgentAttribute extends AgentAttribute {
  get initializer() {
    return 1 as any;
  }
}

class BadAgentAttribute2 extends AgentAttribute {
  get initializer() {
    return undefined as any;
  }
}

@decorateAgent(new BadAgentAttribute())
class MongoDB {

  connection: any;
  constructor() { }

  connect() {
    return 'connected';
  }
}

@decorateAgent(new BadAgentAttribute2())
class MySQL {

  connection: any;
  constructor() { }

  connect() {
    return 'connected';
  }
}

const Redis = (function () {
  return class { };
})();

describe('Decorate Agent', () => {
  describe('# MongoDB should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(MongoDB)).toBe(false);
    });

    it('re-upgrade agent', () => {
      expect(Agent(MongoDB, new BadAgentAttribute())).toBe(MongoDB);
    });

    it('upgrade agent with not attribute', () => {
      @decorateAgent(new AgentAttribute(), [new DisabledMetadataAttribute()])
      class SQLServer { }
      expect(IsAgent(SQLServer)).toBe(true);
    });

    it('new instance', () => {
      const db = new MongoDB();
      expect(db instanceof MongoDB).toBe(true);
      expect(Reflect.getPrototypeOf(db)).toBe(MongoDB.prototype);
    });

    it('new instance without name', () => {
      const Redis$ = Agent(Redis);
      expect(Redis$.name).toBe('Agent$');
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
      expect(Agent(MySQL, new BadAgentAttribute())).toBe(MySQL);
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
      const items = Reflector(MySQL).getAttributes(AgentAttribute);
      expect(items.length).toBe(0);
    });
  });
});
