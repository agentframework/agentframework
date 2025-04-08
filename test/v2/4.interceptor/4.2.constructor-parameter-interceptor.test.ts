import { agent } from 'agentframework';
import {
  Arguments,
  decorateClass,
  decorateParameter,
  ParameterInvocation,
  TypeInvocation
} from '../../../packages/dependencies/agent';

describe('4.4. constructor parameter interceptor', () => {
  describe('# should able to', () => {
    it('intercept class constructor', () => {
      @agent()
      @decorateClass({
        interceptor: {
          intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
            return target.invoke(params, receiver);
          },
        },
      })
      class Class411 {
        constructor(
          @decorateParameter({
            interceptor: {
              intercept(target: ParameterInvocation, params: Arguments, receiver: any): any {
                return Math.floor(params[target.design.index]);
              },
            },
          })
          readonly a: number
        ) {
        }
      }

      const instance = new Class411(3.5);
      expect(instance).toBeInstanceOf(Class411);
      expect(instance.a).toBe(3);
    });
  });
});
