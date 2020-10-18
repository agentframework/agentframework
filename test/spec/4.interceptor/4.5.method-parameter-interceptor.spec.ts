import { agent } from '../../../src/lib/domain/Decorators/agent';
import { decorateClassProperty } from '../../../src/lib/core/Decorator/decorateClassProperty';
import { ClassInvocation, ParameterInvocation } from '../../../src/lib/core/Interfaces/TypeInvocations';
import { Arguments } from '../../../src/lib/core/Interfaces/Arguments';
import { decorateParameter } from '../../../src/lib/core/Decorator/decorateParameter';

describe('4.5. method parameter interceptor', () => {
  describe('# should able to', () => {
    it('intercept class method and parameter', () => {
      @agent()
      class Class412 {
        @decorateClassProperty({
          interceptor: {
            intercept(target: ClassInvocation, params: Arguments, receiver: any): any {
              return target.invoke(params, receiver);
            }
          }
        })
        calc(
          @decorateParameter({
            interceptor: {
              intercept(target: ParameterInvocation, params: Arguments, receiver: any): any {
                return Math.floor(params[target.design.index]);
              }
            }
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
