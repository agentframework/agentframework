import { decorateMember, Invocation, Arguments, agent, decorateAgent, Reflector } from '../../../src/dependencies/agent';

describe('6.8. @interceptable decorator', () => {
  describe('# should able to', () => {
    it('create static initializable agent', () => {
      /**
       * static interceptor require agent attribute, create proxy on top of user code
       */
      @agent()
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

      expect(App681.run(1.5)).toBe(1.5);
    });

    it('create static initializable agent without interceptor', () => {
      /**
       * static interceptor require agent attribute, create proxy on top of user code
       */
      @agent()
      class App682 {
        @decorateMember({})
        static run(n?: number) {
          return n;
        }
      }

      expect(App682).toBeTruthy();
    });

    it('create static initializable agent without attributes', () => {
      /**
       * static interceptor require agent attribute, create proxy on top of user code
       */
      @agent()
      class App683 {
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
        @decorateMember({
          interceptor: {
            intercept(target: Invocation, params: Arguments, receiver: any): any {
              return Math.floor(params[0]);
            },
          },
        })
        run(n?: number) {
          return n;
        }
      }
      expect(App683).toBeTruthy();
      expect(App683.run(4.90327)).toBe(4.90327);
      const app = new App683();
      expect(app.run(2334.22)).toBe(2334);
    });

    it('create static initializable agent', () => {
      @decorateAgent({
        name: 'cool',
      })
      class App684 {
        static run(n?: number) {
          return n;
        }
      }

      expect(Reflector(App684).static.hasAttribute()).toBeTrue();
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
      expect(Reflector(App685).static.hasAttribute()).toBeFalse();
    });
  });
});
