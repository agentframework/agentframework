/* tslint:disable */

import { CreateAgent, IsAgent, decorateMember, agent } from '../../../lib';
import { RoundInterceptor } from '../attributes/RoundInterceptor';

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
