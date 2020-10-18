/* tslint:disable */

import { CreateAgent, IsAgent, decorateClassProperty, agent } from '../../../lib';
import { RoundInterceptor } from '../attributes/RoundInterceptor';

class Base {
  @decorateClassProperty(new RoundInterceptor())
  get age(): number {
    return 1.2;
  }
}

@agent()
class Calculator extends Base {
  @decorateClassProperty(new RoundInterceptor())
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
