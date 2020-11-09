import { agent } from '../../../lib';
import { decorateMember } from '../../../lib';
import { ClassInvocation } from '../../../lib';
import { Arguments } from '../../../lib';
import { IsAgent } from '../../../lib';

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
              return 0;
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
      expect(setter.calc).toBe(3.5);

      const getter = new Class431();
      expect(getter).toBeInstanceOf(Class431);
      expect(getter.calc).toBe(0);
      setter.calc = 3.5;
      expect(setter.calc).toBe(3.5);
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
              return 0;
            },
          },
        })
        value?: number;
      }

      expect(IsAgent(Class432)).toBeTrue();

      const a1 = new Class432();
      expect(a1.value).toBe(0);
      // Reflect.deleteProperty(a1, 'value');
      expect(a1.value).toBe(0);
      // Reflect.deleteProperty(a1, 'value');
      a1.value = 2.99;
      expect(a1.value).toBe(2);
      Reflect.deleteProperty(a1, 'value');
      a1.value = 1.99;
      expect(a1.value).toBe(1);
      Reflect.deleteProperty(a1, 'value');
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
  });

  it('set set get get get class field', () => {
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
            return 0;
          },
        },
      })
      value?: number;
    }

    expect(IsAgent(Class432)).toBeTrue();

    const a1 = new Class432();
    a1.value = 3.99;
    expect(a1.value).toBe(3);
    Reflect.deleteProperty(a1, 'value');
    a1.value = 2.99;
    expect(a1.value).toBe(2);
    Reflect.deleteProperty(a1, 'value');
    a1.value = 1.99;
    expect(a1.value).toBe(1);
    Reflect.deleteProperty(a1, 'value');
    expect(a1.value).toBe(0);
    Reflect.deleteProperty(a1, 'value');
    expect(a1.value).toBe(0);
    Reflect.deleteProperty(a1, 'value');
    expect(a1.value).toBe(0);
  });
});
