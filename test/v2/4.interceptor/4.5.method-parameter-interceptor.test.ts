import { agent } from '../../../lib/dependencies/agent';
import { decorateMember } from '../../../lib/dependencies/agent';
import { TypeInvocation, ParameterInvocation } from '../../../lib/dependencies/agent';
import { Arguments } from '../../../lib/dependencies/agent';
import { decorateParameter } from '../../../lib/dependencies/agent';

describe('4.5. method parameter interceptor', () => {
  describe('# should able to', () => {
    it('intercept class method and parameter', () => {
      @agent()
      class Class412 {
        @decorateMember({
          interceptor: {
            intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
              return target.invoke(params, receiver);
            },
          },
        })
        calc(
          @decorateParameter({
            interceptor: {
              intercept(target: ParameterInvocation, params: Arguments, receiver: any): any {
                return Math.floor(target.invoke(params, receiver));
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
