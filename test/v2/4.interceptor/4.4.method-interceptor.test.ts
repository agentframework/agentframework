import { agent } from '../../../src/dependencies/agent';
import { decorateMember } from '../../../src/dependencies/agent';
import { TypeInvocation } from '../../../src/dependencies/agent';
import { Arguments } from '../../../src/dependencies/agent';
import { IsAgent } from '../../../src/dependencies/agent';

describe('4.4. method interceptor', () => {
  @agent()
  class Class441 {
    @decorateMember({
      interceptor: {
        intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
          return target.invoke([Math.floor(params[0]), Math.floor(params[1])], receiver);
        },
      },
    })
    sum(a: number, b: number): number {
      return a + b;
    }
  }

  describe('# should able to', () => {
    it('check agent', () => {
      expect(IsAgent(Class441));
    });

    it('sum two float number', () => {
      const sum = new Class441();
      expect(sum.sum(1.9, 3.3)).toBe(4);
    });
  });
});
