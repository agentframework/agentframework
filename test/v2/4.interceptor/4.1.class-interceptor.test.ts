import { decorateClass, Arguments, agent, ClassInvocation, decorateMember, decorateAgent } from '../../../src/dependencies/core';

describe('4.1. Class interceptor', () => {
  describe('# should able to', () => {
    it('intercept class constructor', () => {
      @agent()
      @decorateClass({
        interceptor: {
          intercept(target: ClassInvocation, params: Arguments, receiver: any): any {
            return target.invoke([Math.floor(params[0])], receiver);
          },
        },
      })
      class Class411 {
        constructor(readonly a: number) {}

        @decorateMember({ role: 'user' })
        Method411() {}
      }

      const instance = new Class411(3.5);
      expect(instance).toBeInstanceOf(Class411);
      expect(instance.a).toBe(3);
    });

    it('intercept agent constructor', () => {
      @agent()
      @decorateAgent({
        interceptor: {
          intercept(target: ClassInvocation, params: Arguments, receiver: any): any {
            return target.invoke(params, receiver);
          },
        },
      })
      @decorateAgent({})
      class Class412 {
        constructor(readonly a: number) {}

        @decorateMember({ role: 'user' })
        Method412() {}
      }

      const instance = new Class412(3.5);
      expect(instance).toBeInstanceOf(Class412);
      expect(instance.a).toBe(3.5);
    });

    it('decorate agent constructor', () => {
      @agent()
      @decorateAgent({})
      class Class413 {
        constructor(readonly a: number) {}

        @decorateMember({ role: 'user' })
        Method413() {}
      }

      const instance = new Class413(3.5);
      expect(instance).toBeInstanceOf(Class413);
      expect(instance.a).toBe(3.5);
    });
  });
});
