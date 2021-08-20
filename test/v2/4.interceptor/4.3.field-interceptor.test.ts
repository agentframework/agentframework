import { agent, GetAgentType } from '../../../src';
import { decorateMember } from '../../../src';
import { ClassInvocation } from '../../../src';
import { Arguments } from '../../../src';
import { IsAgent } from '../../../src';

describe('4.3. field interceptor', () => {
  describe('# should able to', () => {
    it('intercept class field', () => {
      @agent()
      class Class431 {
        @decorateMember({
          interceptor: {
            intercept(target: ClassInvocation, params: Arguments, receiver: any): any {
              if (typeof params[0] === 'number') {
                const newParams = [Math.floor(params[0])];
                // modify parameters
                return target.invoke(newParams, receiver);
              }
              return Math.floor(target.invoke(params, receiver));
            },
          },
        })
        calc?: number;
      }

      const setter = new Class431();
      expect(setter).toBeInstanceOf(Class431);
      setter.calc = 3.5;
      expect(setter.calc).toBe(3);
      setter.calc = 3.5;
      expect(setter.calc).toBe(3);

      const getter = new Class431();
      expect(getter).toBeInstanceOf(Class431);
      expect(getter.calc).toBeNaN();
      getter.calc = 3.5;
      expect(getter.calc).toBe(3);
    });

    it('get get set set set class field', () => {
      @agent()
      class Class432 {
        @decorateMember({
          interceptor: {
            intercept(target: ClassInvocation, params: Arguments, receiver: any): any {
              if (typeof params[0] === 'number') {
                const newParams = [Math.floor(params[0])];
                // modify parameters
                return target.invoke(newParams, receiver);
              }
              return Math.floor(target.invoke(params, receiver));
            },
          },
        })
        value?: number;
      }

      expect(IsAgent(Class432)).toBeTrue();

      const a1 = new Class432();
      expect(a1.value).toBeNaN();
      // Reflect.deleteProperty(a1, 'value');
      expect(a1.value).toBeNaN();
      // Reflect.deleteProperty(a1, 'value');
      a1.value = 2.99;
      expect(a1.value).toBe(2);
      a1.value = 1.99;
      expect(a1.value).toBe(1);
      a1.value = 0.99;
      expect(a1.value).toBe(0);

      // const desc = Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(a1), 'value');
      // console.log('desc 1 get', desc!.get!.toString());
      // console.log('desc 1 set', desc!.set!.toString());
      //
      // const desc2 = Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(Reflect.getPrototypeOf(a1)), 'value');
      // console.log('desc 2 get', desc2!.get!.toString());
      // console.log('desc 2 set', desc2!.set!.toString());
    });

    it('set set get get get class field', () => {
      @agent()
      class Class433 {
        @decorateMember({
          interceptor: {
            intercept(target: ClassInvocation, params: Arguments, receiver: any): any {
              if (typeof params[0] === 'number') {
                return target.invoke([Math.floor(params[0])], receiver);
              }
              return Math.floor(target.invoke(params, receiver));
            },
          },
        })
        value?: number;
      }

      expect(IsAgent(Class433)).toBeTrue();

      const a1 = new Class433();
      a1.value = 3.99;
      expect(a1.value).toBe(3);
      a1.value = 2.99;
      expect(a1.value).toBe(2);
      a1.value = 1.99;
      expect(a1.value).toBe(1);
      expect(a1.value).toBe(1);
      expect(a1.value).toBe(1);
      expect(a1.value).toBe(1);
    });

    it('intercept class field with default value', () => {
      @agent()
      class Class434 {
        @decorateMember({
          interceptor: {
            intercept(target: ClassInvocation, params: Arguments, receiver: any): any {
              if (typeof params[0] === 'number') {
                const newParams = [Math.floor(params[0])];
                // modify parameters
                return target.invoke(newParams, receiver);
              }
              return Math.floor(target.invoke(params, receiver));
            },
          },
        })
        total!: number;
      }

      const original = GetAgentType(Class434);
      if (original) {
        Reflect.defineProperty(original.prototype, 'total', {
          configurable: true,
          enumerable: false,
          writable: true,
          value: 999.99,
        });
      }

      const setter = new Class434();
      expect(setter).toBeInstanceOf(Class434);
      expect(setter.total).toBe(999);
      expect(setter.total).toBe(999);
      expect(setter.total).toBe(999);
      setter.total = 3.5;
      expect(setter.total).toBe(3);
      setter.total = 4.5;
      expect(setter.total).toBe(4);

      const getter = new Class434();
      expect(getter).toBeInstanceOf(Class434);
      getter.total = 3.5;
      expect(getter.total).toBe(3);
    });
  });
});
