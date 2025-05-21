/* tslint:disable */

import { IsAgent, decorateMember, agent } from '../../../lib/dependencies/agent';
import { RoundInterceptor } from '../1.attributes/RoundInterceptor';
import { CreateAgent } from '../../../lib/dependencies/agent';

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
      expect(IsAgent(Calculator)).toBeTrue();
    });

    it('re-upgrade agent', () => {
      expect(IsAgent(CreateAgent(Calculator))).toBeTrue();
    });
  });
});
