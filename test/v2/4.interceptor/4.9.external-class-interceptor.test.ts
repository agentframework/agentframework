import { agent } from 'agentframework';
import {
  Arguments,
  decorateClass,
  decorateMember,
  GetCustomInterceptor,
  Reflector,
  RemoveCustomInterceptor,
  SetCustomInterceptor,
  TypeInvocation,
} from '../../../packages/dependencies/agent';

describe('4.9. External interceptor', () => {
  describe('# should able to', () => {
    class RoundMethod491 {
    }

    it('intercept class member constructor using external interceptor', () => {
      class RoundMethodInterceptor491 {
        constructor(round491: RoundMethod491) {
        }

        intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
          return target.invoke([Math.floor(params[0])], receiver);
        }
      }

      SetCustomInterceptor(RoundMethod491, RoundMethodInterceptor491);

      expect(GetCustomInterceptor(RoundMethod491)).toBeTruthy();

      @agent()
      @decorateClass(new RoundMethod491())
      class Class491 {
        constructor(public a: number) {
        }

        @decorateMember(new RoundMethod491())
        Method491(a: number) {
          return a;
        }
      }

      expect(Reflector(Class491).property('Method491').hasOwnInterceptor()).toBe(true);

      const instance = new Class491(7.5);
      expect(instance).toBeInstanceOf(Class491);
      expect(instance.a).toBe(7);
      expect(instance.Method491(3.5)).toBe(3);
    });

    it('intercept class member constructor', () => {
      class RoundMethod492 {
        get interceptor() {
          return this;
        }

        intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
          return target.invoke([Math.floor(params[0])], receiver);
        }
      }

      @agent()
      @decorateClass(new RoundMethod492())
      class Class492 {
        constructor(public a: number) {
        }

        @decorateMember(new RoundMethod492())
        Method492(a: number) {
          return a;
        }
      }

      expect(Reflector(Class492).property('Method492').hasOwnInterceptor()).toBe(true);

      const instance = new Class492(7.5);
      expect(instance).toBeInstanceOf(Class492);
      expect(instance.a).toBe(7);
      expect(instance.Method492(3.5)).toBe(3);
    });

    it('remove intercept class member constructor using external interceptor', () => {
      RemoveCustomInterceptor(RoundMethod491);

      @agent()
      @decorateClass(new RoundMethod491())
      class Class493 {
        constructor(public a: number) {
        }

        @decorateMember(new RoundMethod491())
        Method493(a: number) {
          return a;
        }
      }

      expect(Reflector(Class493).property('Method493').hasOwnInterceptor()).toBe(false);

      const instance = new Class493(7.5);
      expect(instance).toBeInstanceOf(Class493);
      expect(instance.a).toBe(7.5);
      expect(instance.Method493(3.5)).toBe(3.5);
    });
  });
});
