import { Agent, decorateClassField, IsAgent, Reflector } from '../../../src/lib';
import { RoundAttribute } from '../attributes/RoundAttribute';

class Calculator {
  @decorateClassField(new RoundAttribute())
  RoundOnField: number;
}

Reflect.defineProperty(Calculator.prototype, 'RoundOnField', {
  value: 1
});

describe('Interceptor on Field', () => {
  describe('# should able to', () => {
    it('define agent', () => {
      expect(IsAgent(Calculator)).toBe(false);
      expect(Agent(Calculator)).toBeTruthy();
    });

    it('re-upgrade agent', () => {
      expect(
        Reflector(Calculator)
          .property('RoundOnField')
          .value.getAttributes(RoundAttribute).length
      ).toBe(1);
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
