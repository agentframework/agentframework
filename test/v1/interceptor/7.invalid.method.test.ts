/* tslint:disable */

import { agent, IsAgent, decorateMember } from '../../../src';
import { CreateAgentClass } from '../../../src';
import { BadRoundAttribute } from '../attributes/BadRoundAttribute';

@agent()
class Calculator {
  @decorateMember(new BadRoundAttribute())
  round(val: number): number {
    // console.log('v1', val);
    return val;
  }

  @decorateMember(new BadRoundAttribute())
  round1(val: number): number {
    // console.log('va2', val);
    return val;
  }
}

describe('Interceptor on Invalid Setter Value', () => {
  describe('# should able to', () => {
    it('define agent', () => {
      expect(IsAgent(Calculator)).toBe(true);
      expect(IsAgent(CreateAgentClass(Calculator))).toBe(true);
    });

    it('create agent', () => {
      const AC = new Calculator();
      expect(AC.round(23423.324234)).toBe(23423.324234);
      expect(AC.round1(23423.324234)).toBe(23423.324234);
    });
  });
});
