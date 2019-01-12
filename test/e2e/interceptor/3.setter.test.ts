import { agent, Agent, IsAgent, decorateClassMember } from '../../../src/lib';
import { BeforeRoundAttribute } from '../attributes/BeforeRoundAttribute';

@agent()
class Calculator {
  rounded: number;

  @decorateClassMember(new BeforeRoundAttribute())
  set round(val: number) {
    this.rounded = val;
  }
}

describe('Interceptor on setter Value', () => {
  describe('# should able to', () => {
    it('42', () => {
      expect(Agent(Calculator) === Calculator).toBe(IsAgent(Calculator));
    });

    it('define agent', () => {
      expect(IsAgent(Calculator)).toBe(true);
      expect(Agent(Calculator)).toBe(Calculator);
    });

    it('create agent', () => {
      const calc = new Calculator();
      calc.round = 23423.324234;
      expect(calc.rounded).toBe(23423);
    });
  });
});
