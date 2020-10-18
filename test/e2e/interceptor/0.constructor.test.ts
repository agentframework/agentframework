/* tslint:disable */

import {
  agent,
  CreateAgent,
  decorate,
  decorateClassProperty,
  decorateParameter,
  Attribute,
  IsAgent,
  Interceptor,
  Invocation,
  Arguments,
  MemberKinds,
  decorateClass
} from '../../../lib';
import { RoundInterceptor } from '../attributes/RoundInterceptor';

class AgentChecker implements Attribute, Interceptor {
  get interceptor(): Interceptor {
    return this;
  }

  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  public intercept(target: Invocation, parameters: Arguments, receiver: any): any {
    expect(typeof receiver).toBe('function');
    return target.invoke(parameters, receiver);
  }
}

@decorateClass(new AgentChecker())
@agent()
class Calculator {
  @decorateClassProperty(new RoundInterceptor())
  round1(num: any) {
    return num;
  }

  @decorateClassProperty(new RoundInterceptor())
  round2(num: any) {
    return num;
  }

  @decorate(new RoundInterceptor(), MemberKinds.Property)
  round3(num: any) {
    return num;
  }

  round4(@decorateParameter(new RoundInterceptor()) num: any) {
    return num;
  }
}

describe('Interceptor on Constructor', () => {
  describe('# should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(Calculator)).toBeTrue();
    });

    it('re-upgrade agent', () => {
      expect(IsAgent(CreateAgent(Calculator))).toBeTrue();
    });

    it('new instance', () => {
      const ca = new Calculator();
      expect(ca instanceof Calculator).toBe(true);
      expect(Reflect.getPrototypeOf(ca)).toBe(Calculator.prototype);
    });

    it('construct instance', () => {
      const ca = Reflect.construct(Calculator, [1, 2, 3]);
      expect(ca instanceof Calculator).toBe(true);
      expect(Reflect.getPrototypeOf(ca)).toBe(Calculator.prototype);
    });
  });
});
