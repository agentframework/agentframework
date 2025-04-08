import { agent, once } from 'agentframework';
import { Arguments, decorateMember, Design, Invocation } from '../../../packages/dependencies/agent';

describe('4.10. Empty interceptors', () => {
  describe('# should able to', () => {
    it('intercept class constructor', () => {
      let n1 = 0,
        n2 = 0;

      @agent()
      class Class4101 {
        @once()
        @decorateMember({
          interceptor: <any>false,
        })
        @decorateMember({
          interceptor: <any>null,
        })
        @decorateMember({
          interceptor: <any>0,
        })
        @decorateMember({
          interceptor: <any>undefined,
        })
        @decorateMember({
          interceptor: {
            intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
              return target.invoke(params, receiver);
            },
          },
        })
        get name() {
          n1++;
          return 'Class4101' + n1;
        }

        @decorateMember({
          interceptor: <any>false,
        })
        @decorateMember({
          interceptor: <any>null,
        })
        @decorateMember({
          interceptor: <any>0,
        })
        @decorateMember({
          interceptor: <any>undefined,
        })
        @decorateMember({
          get interceptor(): any {
            return null;
          },
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
          return 'Class4101' + n2;
        }
      }

      const instance = new Class4101();
      expect(instance.name).toBe('Class41011');
      expect(n1).toBe(1);
      expect(instance.name).toBe('Class41011');
      expect(n1).toBe(1);

      expect(instance.location).toBe('Class41011');
      expect(n2).toBe(1);
      expect(instance.location).toBe('Class41012');
      expect(n2).toBe(2);
    });
  });
});
