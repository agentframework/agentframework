/* tslint:disable */

import { agent, IsAgent, decorateMember } from '../../../lib';
import { CreateAgent } from '../../../src/core';
import { BeforeRoundAttribute } from '../attributes/BeforeRoundAttribute';

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
      expect(IsAgent(Calculator)).toBeTrue();
      expect(IsAgent(CreateAgent(Calculator))).toBeTrue();
    });

    it('create agent', () => {
      const calc = new Calculator();
      calc.round = 23423.324234;
      expect(calc.rounded).toBe(23423);
    });
  });
});
