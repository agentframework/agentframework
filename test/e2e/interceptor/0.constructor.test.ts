import 'jasmine';
import {
  agent,
  Agent,
  decorate,
  decorateClassMember,
  decorateClassMethod,
  decorateParameter,
  IAttribute,
  IsAgent,
  Target,
  IInterceptor,
  IInvocation
} from '../../../src/lib';
import { RoundAttribute } from '../attributes/RoundAttribute';

class AgentChecker implements IAttribute, IInterceptor {
  get interceptor(): IInterceptor {
    return this;
  }

  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  public intercept(target: IInvocation, parameters: ArrayLike<any>): any {
    expect(typeof target.target).toBe('function');
    return target.invoke(parameters);
  }
}

@agent([new AgentChecker()])
class Calculator {
  
  @decorateClassMethod(new RoundAttribute())
  round1(num: any) {
    return num;
  }

  @decorateClassMember(new RoundAttribute())
  round2(num: any) {
    return num;
  }

  @decorate(new RoundAttribute(), Target.Method)
  round3(num: any) {
    return num;
  }

  round4(@decorateParameter(new RoundAttribute()) num: any) {
    return num;
  }
}

describe('Interceptor on Constructor', () => {
  describe('# should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(Calculator)).toBe(true);
    });

    it('re-upgrade agent', () => {
      expect(Agent(Calculator)).toBe(Calculator);
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
