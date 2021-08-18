import { agent } from '../../../src';
import { decorateMember } from '../../../src';
import { ClassInvocation } from '../../../src';
import { Arguments } from '../../../src';
import { IsAgent } from '../../../src';

describe('4.4. method interceptor', () => {
  @agent()
  class Class441 {
    @decorateMember({
      interceptor: {
        intercept(target: ClassInvocation, params: Arguments, receiver: any): any {
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
