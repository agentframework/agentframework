import { agent } from '../../../src/lib/domain/Decorators/agent';
import { decorateClassProperty } from '../../../src/lib/core/Decorator/decorateClassProperty';
import { PropertyInvocation } from '../../../src/lib/core/Interfaces/TypeInvocations';
import { Arguments } from '../../../src/lib/core/Interfaces/Arguments';

describe('4.8. Getter and Setter interceptor', () => {
  describe('# should able to', () => {
    it('set set set get get get value', () => {
      @agent()
      class Class481 {
        int: number | undefined;

        @decorateClassProperty({
          interceptor: {
            intercept(target: PropertyInvocation, params: Arguments, receiver: any): any {
              expect(target.design.descriptor).toBeTruthy();
              return target.invoke(params, receiver);
            },
          },
        })
        @decorateClassProperty({
          interceptor: {
            intercept(target: PropertyInvocation, params: Arguments, receiver: any): any {
              // console.log('before intercept', params);
              if (typeof params[0] === 'number') {
                return target.invoke([Math.floor(params[0])], receiver);
              }
              return Math.floor(target.invoke(params, receiver));
            },
          },
        })
        set value(n: number) {
          this.int = n;
        }
        get value(): number {
          return this.int || 0;
        }
      }

      const instance = new Class481();
      expect(instance).toBeInstanceOf(Class481);
      expect(instance.int).toBeUndefined();

      // console.log();
      // console.log('==================== start write');
      // const d = Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(instance.constructor.prototype), 'both');
      // console.log('type 1111 = ', d?.get?.toString());
      // console.log('type 2222 = ', d?.set?.toString());
      instance.value = 5.5;
      // const d2 = Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(instance), 'both');
      // console.log('type 1111 = ', d2?.get?.toString());
      // console.log('type 2222 = ', d2?.set?.toString());
      expect(instance.int).toBe(5);
      instance.value = 4.5;
      expect(instance.int).toBe(4);
      instance.value = 3.5;
      expect(instance.int).toBe(3);

      instance.int = 5.5;
      expect(instance.value).toBe(5);
      instance.int = 4.5;
      expect(instance.value).toBe(4);
      instance.int = 3.5;
      expect(instance.value).toBe(3);
    });

    it('get get get set set set value', () => {
      @agent()
      class Class482 {
        int: number | undefined;

        @decorateClassProperty({
          interceptor: {
            intercept(target: PropertyInvocation, params: Arguments, receiver: any): any {
              // console.log('before intercept', params);
              if (typeof params[0] === 'number') {
                return target.invoke([Math.floor(params[0])], receiver);
              }
              return Math.floor(target.invoke(params, receiver));
            },
          },
        })
        set value(n: number) {
          this.int = n;
        }
        get value(): number {
          return this.int || 0;
        }
      }

      const instance = new Class482();
      expect(instance).toBeInstanceOf(Class482);
      expect(instance.int).toBeUndefined();

      instance.int = 5.5;
      expect(instance.value).toBe(5);
      instance.int = 4.5;
      expect(instance.value).toBe(4);
      instance.int = 3.5;
      expect(instance.value).toBe(3);

      instance.value = 5.5;
      expect(instance.int).toBe(5);
      instance.value = 4.5;
      expect(instance.int).toBe(4);
      instance.value = 3.5;
      expect(instance.int).toBe(3);
    });
  });
});