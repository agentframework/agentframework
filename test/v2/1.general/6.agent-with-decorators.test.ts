import { agent, decorateMember, GetType, Reflector } from '../../../src/dependencies/core';

describe('1.6. Agent with decorators', () => {
  describe('# should able to', () => {
    it('get decorators from Agent', () => {
      @agent()
      class AgentWithDecorators {
        @decorateMember({ type: 'string' })
        name: string | undefined;
      }
      const r1 = Reflector(AgentWithDecorators);
      expect(r1.property('name').getOwnAttributes().length).toBe(1);
      const p2 = r1.getProperty('name');
      expect(p2).toBeDefined();
      if (p2) {
        expect(p2.declaringType).toBe(r1.type);
        expect(p2.declaringType).not.toBe(AgentWithDecorators);
        expect(p2.declaringType).toBe(GetType(AgentWithDecorators)!);
      }
    });
  });
});
