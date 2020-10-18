/* tslint:disable */

import { agent, CreateAgent, IsAgent, decorateClassProperty } from '../../../lib';
import { BeforeRoundAttribute } from '../attributes/BeforeRoundAttribute';

@agent()
class Calculator {
  _round!: number;

  @decorateClassProperty(new BeforeRoundAttribute())
  set round(val: number) {
    // console.log('va', val);
    this._round = val;
  }
}

describe('Interceptor on Invalid Setter Value', () => {
  describe('# should able to', () => {
    it('define agent', () => {
      expect(IsAgent(Calculator)).toBeTrue();
      expect(IsAgent(CreateAgent(Calculator))).toBeTrue();
    });

    it('create agent', () => {
      const AC = new Calculator();
      AC.round = 23423.324234;
      expect(AC._round).toBe(23423);
    });
  });
});
