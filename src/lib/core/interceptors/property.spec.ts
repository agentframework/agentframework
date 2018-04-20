import { agent } from '../../agent'
import { decorateClassField, decorateClassMethod } from '../decorator';
import { IAttribute } from '../attribute';
import { IInterceptor } from '../interceptor';
import { IInvocation } from '../invocation';
import { CreatePropertyInterceptors } from './property';
import { IInitializer } from '../initializer';
declare var console;

describe('core.interceptor.property', () => {

  describe('# should able to', () => {

    it('decorate more than one interceptor on method', () => {

      class IncreaseValueAttribute implements IAttribute, IInterceptor {
        intercept(target: IInvocation, parameters: ArrayLike<any>): any {
          Object.keys(target.target);
          return target.invoke(parameters) + 10;
        }

        getInterceptor() {
          return this;
        }
      }

      @agent()
      class Tester01 {

        @decorateClassMethod(new IncreaseValueAttribute())
        @decorateClassMethod(new IncreaseValueAttribute())
        @decorateClassMethod(new IncreaseValueAttribute())
        @decorateClassMethod(new IncreaseValueAttribute())
        getNumber(): number {
          return 10;
        }

      }

      class Tester02 {

      }

      // should able to create the class with null initializer
      const interceptorBag = CreatePropertyInterceptors(Tester01);

      Object.defineProperties(Tester02.prototype, interceptorBag);

      const instance = new Tester02();
      expect(instance).toBeTruthy();
      expect(instance instanceof Tester02).toBeTruthy();

      const num = instance['getNumber']();
      expect(num).toBe(50);

    });


  });

  describe('# should not able to', () => {

    it('decorate interceptor on field without initializer', () => {

      class IncreaseValueAttribute implements IAttribute, IInterceptor {
        intercept(target: IInvocation, parameters: ArrayLike<any>): any {
          Object.keys(target.target);
          return target.invoke(parameters) + 10;
        }

        getInterceptor() {
          return this;
        }
      }

      @agent()
      class Tester01 {


        @decorateClassField(new IncreaseValueAttribute())
        total = 100;

      }


      expect(() => {

        // should not able to create the class
        CreatePropertyInterceptors(Tester01);

      }).toThrowError();


    });

    it('decorate interceptor on field initializer', () => {

      class IncreaseValueAttribute implements IAttribute, IInterceptor {
        intercept(target: IInvocation, parameters: ArrayLike<any>): any {
          Object.keys(target.target);
          return target.invoke(parameters) + 10;
        }

        getInterceptor() {
          return this;
        }
      }

      class DefaultValueAttribute implements IAttribute, IInitializer {

        initialize(target: IInvocation, parameters: ArrayLike<any>): any {
          const def = target.invoke(parameters);
          console.log('keys', Object.keys(target.target), 'def', def);
          return 10;
        }

        getInitializer() {
          return this;
        }

      }

      @agent()
      class Tester01 {

        @decorateClassField(new IncreaseValueAttribute())
        @decorateClassField(new DefaultValueAttribute())
        total = 100;

      }

      // should not able to create the class
      const bag = CreatePropertyInterceptors(Tester01);

      // have interceptor. but not create here
      // this interceptor will create together with initializer
      expect(Object.keys(bag).length).toBe(0);


    });

  });
});
