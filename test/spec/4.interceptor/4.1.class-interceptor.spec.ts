import { decorateClass, Arguments, agent, ClassInvocation, decorateMember } from '../../../lib';

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
  });
});
