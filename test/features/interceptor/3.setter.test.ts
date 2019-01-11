import { agent, Agent, IsAgent, decorateClassMember } from '../../../src/lib';
import { BeforeRoundAttribute } from '../attributes/BeforeRoundAttribute';

@agent()
class Calculator {
  _round: number;

  @decorateClassMember(new BeforeRoundAttribute())
  set round(val: number) {
    console.log('va', val);
    this._round = val;
  }
}
//
// Reflect.defineProperty(Calculator.prototype, 'round', {
//   value: undefined
// });

describe('Interceptor on setter Value', () => {
  describe('# should able to', () => {
    it('define agent', () => {
      expect(IsAgent(Calculator)).toBe(true);
      expect(Agent(Calculator)).toBe(Calculator);
    });

    it('create agent', () => {
      const AC = new Calculator();
      AC.round = 23423.324234;
      expect(AC._round).toBe(23423);
    });
  });
});
