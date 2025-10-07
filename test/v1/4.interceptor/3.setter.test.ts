/* tslint:disable */
import { agent } from 'agentframework';
import { CreateAgent, decorateMember, IsAgent } from '../../../packages/dependencies/agent';
import { BeforeRoundAttribute } from '../1.attributes/BeforeRoundAttribute';

@agent()
class Calculator {
  rounded!: number;

  @decorateMember(new BeforeRoundAttribute())
  set round(val: number) {
    this.rounded = val;
  }
}

describe('Interceptor on setter Value', () => {
  describe('# should able to', () => {
    it('define agent', () => {
      expect(IsAgent(Calculator)).toBe(true);
      expect(IsAgent(CreateAgent(Calculator))).toBe(true);
    });

    it('create agent', () => {
      const calc = new Calculator();
      calc.round = 23423.324234;
      expect(calc.rounded).toBe(23423);
    });
  });
});
