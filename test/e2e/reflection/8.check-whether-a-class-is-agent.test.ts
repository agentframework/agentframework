/* tslint:disable */

import { Agent, agent, GetType, IsAgent } from '../../../src/lib';

@agent()
class Calculator { }

class Computer { }

describe('Reflection Helper', () => {
  describe('# should able to', () => {
    it('check agent', () => {
      expect(IsAgent(Calculator)).toBe(true);
    });

    it('check agent', () => {
      expect(IsAgent(Computer)).toBe(false);
    });

    it('get origin type of an upgraded class', () => {
      expect(GetType(Agent(Computer))).toBe(Computer);
    });

    it('get origin type of an agent', () => {
      expect(Agent(Calculator)).toBe(Calculator);
    });

    it('get origin type of an agent', () => {
      expect(GetType(Calculator)!.prototype).toBe(Object.getPrototypeOf(Calculator.prototype));
    });

    it('get origin type of an agent', () => {
      expect(GetType(Agent(Computer))!.prototype).toBe(Computer.prototype);
    });
  });
});
