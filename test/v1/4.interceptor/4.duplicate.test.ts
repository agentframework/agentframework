/* tslint:disable */
import { agent } from 'agentframework';
import { IsAgent, decorateMember } from '../../../packages/dependencies/agent';
import { RoundInterceptor } from '../1.attributes/RoundInterceptor';
import { CreateAgent } from '../../../packages/dependencies/agent';

class Base {
  @decorateMember(new RoundInterceptor())
  get age(): number {
    return 1.2;
  }
}

@agent()
class Calculator extends Base {
  @decorateMember(new RoundInterceptor())
  get age(): number {
    return 1.5;
  }
}

describe('Duplicate Interceptors', () => {
  describe('# should able to', () => {
    it('define agent', () => {
      expect(IsAgent(Calculator)).toBe(true);
    });

    it('re-upgrade agent', () => {
      expect(IsAgent(CreateAgent(Calculator))).toBe(true);
    });
  });
});
