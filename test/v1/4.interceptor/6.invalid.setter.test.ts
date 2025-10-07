/* tslint:disable */
import { agent } from 'agentframework';
import { CreateAgent, decorateMember, IsAgent } from '../../../packages/dependencies/agent';
import { BeforeRoundAttribute } from '../1.attributes/BeforeRoundAttribute';

@agent()
class Calculator {
  _round!: number;

  @decorateMember(new BeforeRoundAttribute())
  set round(val: number) {
    // console.log('va', val);
    this._round = val;
  }
}

describe('Interceptor on Invalid Setter Value', () => {
  describe('# should able to', () => {
    it('define agent', () => {
      expect(IsAgent(Calculator)).toBe(true);
      expect(IsAgent(CreateAgent(Calculator))).toBe(true);
    });

    it('create agent', () => {
      const AC = new Calculator();
      AC.round = 23423.324234;
      expect(AC._round).toBe(23423);
    });
  });
});
