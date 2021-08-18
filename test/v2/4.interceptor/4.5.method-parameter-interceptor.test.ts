import { agent } from '../../../src';
import { decorateMember } from '../../../src';
import { ClassInvocation, ParameterInvocation } from '../../../src';
import { Arguments } from '../../../src';
import { decorateParameter } from '../../../src';

describe('4.5. method parameter interceptor', () => {
  describe('# should able to', () => {
    it('intercept class method and parameter', () => {
      @agent()
      class Class412 {
        @decorateMember({
          interceptor: {
            intercept(target: ClassInvocation, params: Arguments, receiver: any): any {
              return target.invoke(params, receiver);
            },
          },
        })
        calc(
          @decorateParameter({
            interceptor: {
              intercept(target: ParameterInvocation, params: Arguments, receiver: any): any {
                return Math.floor(params[target.design.index]);
              },
            },
          })
          a: number
        ) {
          return a;
        }
      }
      const instance = new Class412();
      expect(instance).toBeInstanceOf(Class412);
      expect(instance.calc(3.6)).toBe(3);
    });
  });
});
