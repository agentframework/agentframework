import { agent } from '../../../src/lib/domain/Decorators/agent';
import { decorateClass } from '../../../src/lib/core/Decorator/decorateClass';
import { ClassInvocation, ParameterInvocation } from '../../../src/lib/core/Interfaces/TypeInvocations';
import { Arguments } from '../../../src/lib/core/Interfaces/Arguments';
import { decorateParameter } from '../../../src/lib/core/Decorator/decorateParameter';

describe('4.4. constructor parameter interceptor', () => {
  describe('# should able to', () => {
    it('intercept class constructor', () => {
      @agent()
      @decorateClass({
        interceptor: {
          intercept(target: ClassInvocation, params: Arguments, receiver: any): any {
            return target.invoke(params, receiver);
          }
        }
      })
      class Class411 {
        constructor(
          @decorateParameter({
            interceptor: {
              intercept(target: ParameterInvocation, params: Arguments, receiver: any): any {
                return Math.floor(params[target.design.index]);
              }
            }
          })
          readonly a: number
        ) {}
      }

      const instance = new Class411(3.5);
      expect(instance).toBeInstanceOf(Class411);
      expect(instance.a).toBe(3);
    });
  });
});
