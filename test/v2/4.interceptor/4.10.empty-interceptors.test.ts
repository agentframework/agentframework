import { agent, Arguments, decorateMember, Invocation, once, Design } from '../../../src/dependencies/agent';

describe('4.10. Empty interceptors', () => {
  describe('# should able to', () => {
    it('intercept class constructor', () => {
      let n1 = 0,
        n2 = 0;
      @agent()
      class Class4101 {
        @decorateMember({
          interceptor: <any>false,
        })
        @decorateMember({
          interceptor: <any>false,
        })
        @decorateMember({
          interceptor: <any>false,
        })
        @decorateMember({
          interceptor: <any>false,
        })
        @decorateMember({
          interceptor: <any>false,
        })
        @decorateMember({
          interceptor: {
            intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
              return target.invoke(params, receiver);
            },
          },
        })
        @once()
        get name() {
          n1++;
          return 'Class4101';
        }

        @decorateMember({
          interceptor: <any>false,
        })
        @decorateMember({
          interceptor: <any>false,
        })
        @decorateMember({
          interceptor: <any>false,
        })
        @decorateMember({
          interceptor: <any>false,
        })
        @decorateMember({
          interceptor: <any>false,
        })
        @decorateMember({
          interceptor: {
            intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
              return target.invoke(params, receiver);
            },
          },
        })
        get location() {
          // console.log();
          // console.log(n2, 'call stack', new Error().stack);
          n2++;
          return 'Class4101';
        }
      }

      const instance = new Class4101();
      expect(instance.name).toBe('Class4101');
      expect(n1).toBe(1);
      expect(instance.name).toBe('Class4101');
      expect(n1).toBe(1);

      expect(instance.location).toBe('Class4101');
      expect(n2).toBe(1);
      expect(instance.location).toBe('Class4101');
      expect(n2).toBe(2);
    });
  });
});
