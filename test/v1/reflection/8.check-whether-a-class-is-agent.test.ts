/* tslint:disable */

import { agent, IsAgent } from '../../../src';
import { CreateAgentClass, GetAgentType } from '../../../src';

@agent()
class AgentClass {}

class NormalClass {}

describe('Reflection Helper', () => {
  describe('# should able to', () => {
    it('create a new agent from existing agent', () => {
      expect(CreateAgentClass(AgentClass)).toBeTruthy();
    });

    it('create a new agent from existing class', () => {
      expect(CreateAgentClass(NormalClass)).toBeTruthy();
    });

    it('check agent', () => {
      expect(IsAgent(AgentClass)).toBe(true);
    });

    it('check class', () => {
      expect(IsAgent(NormalClass)).toBe(false);
    });

    it('get origin type of an agent', () => {
      expect(IsAgent(AgentClass)).toBeTrue();
      const a = GetAgentType(AgentClass);
      expect(a).toBeDefined();
      expect(a).not.toBe(AgentClass);
      expect(a!.prototype).not.toBe(AgentClass.prototype);
    });

    it('get origin type of the upgraded class', () => {
      expect(GetAgentType(CreateAgentClass(NormalClass))).toBeUndefined();
    });

    it('get origin type of the upgraded agent', () => {
      expect(GetAgentType(CreateAgentClass(AgentClass))).not.toBe(AgentClass);
    });
  });
});
