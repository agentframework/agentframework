/* tslint:disable */
import { OnDemandAgentAttribute, CreateAgent, IsAgent, Reflector } from '../../../dependencies/agent';
import { agent } from '../../../dependencies/domain';

@agent()
class MongoDB {
  public connect(): boolean {
    return true;
  }
}

describe('Domain @agent() decorator', () => {
  describe('# should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(MongoDB)).toBe(true);
    });

    it('re-upgrade agent', () => {
      const newAgent = CreateAgent(MongoDB);
      expect(newAgent).not.toBe(MongoDB);
    });

    it('new instance', () => {
      const db = new MongoDB();
      expect(db instanceof MongoDB).toBe(true);
    });

    it('construct instance', () => {
      const db = Reflect.construct(MongoDB, []);
      expect(Reflect.getPrototypeOf(db)).toBe(MongoDB.prototype);
      expect(db instanceof MongoDB).toBe(true);
    });

    it('double agent', () => {
      @agent()
      @agent()
      class DoubleClass {}

      const DoubleAgent = CreateAgent(DoubleClass);

      expect(DoubleClass).not.toBe(DoubleAgent);
      expect(DoubleAgent).not.toBe(DoubleClass);

      const da = new DoubleAgent();
      expect(da).toBeInstanceOf(DoubleAgent);
      expect(da).not.toBeInstanceOf(DoubleClass);

      const dc = new DoubleClass();
      expect(dc).toBeInstanceOf(DoubleClass);
      expect(dc).not.toBeInstanceOf(DoubleAgent);
    });
  });

  describe('# should not able to', () => {
    it('get agent attribute', () => {
      // AgentAttribute is only used in compile agent phase
      // AgentAttribute is not a metadata for agent class
      const items = Reflector(MongoDB).getOwnAttributes(OnDemandAgentAttribute);
      expect(items.length).toBe(0);
    });
  });
});
