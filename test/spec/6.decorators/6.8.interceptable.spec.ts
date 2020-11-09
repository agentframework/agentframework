import { decorateMember, Invocation, Arguments, interceptable, agent, decorateAgent, Reflector } from '../../../lib';

describe('6.8. @interceptable decorator', () => {
  describe('# should able to', () => {
    it('create static initializable agent', () => {
      /**
       * static interceptor require agent attribute, create proxy on top of user code
       */
      @agent()
      @interceptable()
      class App681 {
        @decorateMember({
          interceptor: {
            intercept(target: Invocation, params: Arguments, receiver: any): any {
              return Math.floor(params[0]);
            },
          },
        })
        static run(n?: number) {
          return n;
        }
      }

      expect(App681.run(1.5)).toBe(1);
    });

    it('create static initializable agent without properties', () => {
      /**
       * static interceptor require agent attribute, create proxy on top of user code
       */
      @agent()
      @interceptable()
      class App682 {}

      expect(App682).toBeTruthy();
    });

    it('create static initializable agent', () => {
      @decorateAgent({
        name: 'cool',
      })
      class App683 {
        static run(n?: number) {
          return n;
        }
      }
      expect(Reflector(App683).static.hasOwnAttribute()).toBeTrue();
    });
  });

  describe('# should not able to', () => {
    it('create static initializable agent', () => {
      @decorateAgent({
        beforeDecorate(): boolean {
          return false;
        },
      })
      class App685 {
        static run(n?: number) {
          return n;
        }
      }
      expect(Reflector(App685).static.hasOwnAttribute()).toBeFalse();
    });
  });
});
