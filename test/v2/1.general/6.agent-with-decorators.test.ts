import { agent, decorateClass, decorateMember, GetType, Reflector } from '../../../src/dependencies/agent';


describe('1.6. Agent with decorators', () => {
  describe('# should able to', () => {
    it('get decorators from Agent', () => {
      @decorateClass({ id: 'aboveAgentDecorator1' })
      @agent()
      @decorateClass({ id: 'belowAgentDecorator1' })
      class AgentWithDecorators {
        @decorateMember({ type: 'string' })
        name: string | undefined;
      }
      const r1 = Reflector(AgentWithDecorators);
      expect(r1.getOwnAttributes().length).toBe(1);
      expect(r1.getOwnProperties().length).toBe(1);
      const p2 = r1.getProperty('name');
      expect(p2).toBeDefined();
      if (p2) {
        expect(p2.getOwnAttributes().length).toBe(1);
        expect(p2.declaringType).toBe(r1.declaringType);
        expect(p2.declaringType).not.toBe(AgentWithDecorators);
        expect(p2.declaringType).toBe(GetType(AgentWithDecorators)!);
      }
    });

    it('get decorators from Double Agent', () => {
      @decorateClass({ id: 'aboveAgentDecorator2' })
      @agent()
      @decorateClass({ id: 'aboveAgentDecorator1' })
      @agent()
      @decorateClass({ id: 'belowAgentDecorator1' })
      class Agent2WithDecorators {
        @decorateMember({ type: 'string' })
        name: string | undefined;
      }
      const r1 = Reflector(Agent2WithDecorators);
      expect(r1.getOwnAttributes().length).toBe(1);
      expect(r1.getOwnProperties().length).toBe(1);
      const p2 = r1.getProperty('name');
      expect(p2).toBeDefined();
      if (p2) {
        expect(p2.getOwnAttributes().length).toBe(1);
        expect(p2.declaringType).toBe(r1.declaringType);
        expect(p2.declaringType).not.toBe(Agent2WithDecorators);
        expect(p2.declaringType).toBe(GetType(Agent2WithDecorators)!);
      }
    });

    it('get decorators from Extended Agent', () => {
      @decorateClass({ id: 'aboveAgentDecorator2' })
      @agent()
      @decorateClass({ id: 'aboveAgentDecorator1' })
      @agent()
      @decorateClass({ id: 'belowAgentDecorator1' })
      class Agent3WithDecorators {
        @decorateMember({ type: 'string' })
        name: string | undefined;
      }

      @decorateClass({ id: 'aboveAgentDecorator31' })
      @agent()
      @decorateClass({ id: 'belowAgentDecorator31' })
      class Agent3 extends Agent3WithDecorators {
        @decorateMember({ type: 'string' })
        address: string | undefined;
      }

      const r1 = Reflector(Agent3);
      expect(r1.declaringType).not.toBe(Agent3);
      expect(r1.type).not.toBe(Agent3);

      expect(r1.getOwnAttributes().length).toBe(1);
      expect(r1.getOwnProperties().length).toBe(1);
      const nameField = r1.getProperty('name');
      expect(nameField).toBeDefined();
      if (nameField) {
        expect(nameField.getOwnAttributes().length).toBe(1);
        expect(nameField.declaringType).not.toBe(Agent3);
        expect(nameField.declaringType).not.toBe(Agent3WithDecorators);
        const b3t = GetType(Agent3WithDecorators);
        expect(b3t).toBeDefined();
        if (b3t) {
          expect(nameField.declaringType).toBe(b3t);
        }
      }

      const addressField = r1.getProperty('address');
      expect(addressField).toBeDefined();
      if (addressField) {
        expect(addressField.getOwnAttributes().length).toBe(1);
        expect(addressField.declaringType).not.toBe(Agent3);
        expect(addressField.declaringType).not.toBe(Agent3WithDecorators);
        const a3t = GetType(Agent3);
        expect(a3t).toBeDefined();
        if (a3t) {
          expect(addressField.declaringType).toBe(a3t);
        }
      }
    });
  });
});
