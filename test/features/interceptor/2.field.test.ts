import { Agent, decorateClassField, IsAgent } from '../../../src/lib';
import { RoundAttribute } from '../attributes/RoundAttribute';

class Calculator {
  @decorateClassField(new RoundAttribute())
  round: number;
}

describe('Interceptor on Field', () => {
  describe('# should able to', () => {
    it('define agent', () => {
      expect(IsAgent(Calculator)).toBe(false);
    });

    it('re-upgrade agent', () => {
      expect(Agent(Calculator)).toBeTruthy();
    });
  });

  describe('# should not able to', () => {
    it('create agent', () => {
      const AC = Agent(Calculator);
      expect(() => {
        new AC();
      }).toThrow();
    });
  });
});
