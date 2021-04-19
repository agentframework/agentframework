/* tslint:disable */

import { CreateAgent, agent, GetAgentType, IsAgent } from '../../../lib';

@agent()
class AgentClass {}

class NormalClass {}

describe('Reflection Helper', () => {
  describe('# should able to', () => {
    it('create a new agent from existing agent', () => {
      expect(CreateAgent(AgentClass)).toBeTruthy();
    });

    it('create a new agent from existing class', () => {
      expect(CreateAgent(NormalClass)).toBeTruthy();
    });

    it('check agent', () => {
      expect(IsAgent(AgentClass)).toBe(true);
    });

    it('check class', () => {
      expect(IsAgent(NormalClass)).toBe(false);
    });

    it('get origin type of an agent', () => {
      expect(GetAgentType(AgentClass)!.prototype).toBe(
        Object.getPrototypeOf(Object.getPrototypeOf(AgentClass.prototype))
      );
    });

    it('get origin type of the upgraded class', () => {
      expect(GetAgentType(CreateAgent(NormalClass))).toBe(NormalClass);
    });

    it('get origin type of the upgraded agent', () => {
      expect(GetAgentType(CreateAgent(AgentClass))).not.toBe(AgentClass);
    });
  });
});
