import { Agent, AgentAttribute, IsAgent, Reflector, decorateAgent, UniversalDecorator } from '../../../src/lib';

class FakeAgentAttribute extends AgentAttribute {
  get initializer() {
    return <any>1;
  }
}

class FakeAgentAttribute2 extends AgentAttribute {
  get initializer() {
    return undefined;
  }
}

@decorateAgent(new FakeAgentAttribute())
class MongoDB {
  constructor() {}

  connection: any;

  connect() {
    return 'connected';
  }
}

@decorateAgent(new FakeAgentAttribute2())
class MongoDB2 {
  constructor() {}

  connection: any;

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
      expect(Agent(MongoDB, new FakeAgentAttribute())).toBe(MongoDB);
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
      expect(IsAgent(MongoDB2)).toBe(false);
    });

    it('re-upgrade agent', () => {
      expect(Agent(MongoDB2, new FakeAgentAttribute())).toBe(MongoDB2);
    });

    it('new instance', () => {
      const db = new MongoDB2();
      expect(db instanceof MongoDB2).toBe(true);
      expect(Reflect.getPrototypeOf(db)).toBe(MongoDB2.prototype);
    });

    it('construct instance', () => {
      const db = Reflect.construct(MongoDB2, []);
      expect(db instanceof MongoDB2).toBe(true);
      expect(Reflect.getPrototypeOf(db)).toBe(MongoDB2.prototype);
    });
  });

  describe('# should not able to', () => {
    it('get agent attribute', () => {
      const items = Reflector(MongoDB2).getAttributes(AgentAttribute);
      expect(items.length).toBe(0);
    });
  });
});
