import { agent } from '../../agent'
import { decorateClassMethod, decorateClassField, decorateClassMember } from '../decorator';
import { IAttribute } from '../attribute';
import { IInterceptor } from '../interceptor';
import { IInvocation } from '../invocation';
import { IInitializer } from '../initializer';


class InterceptorAttribute implements IAttribute, IInterceptor {

  intercept(target: IInvocation, parameters: ArrayLike<any>): any {
    return target.invoke(parameters);
  }

  getInterceptor() {
    return this;
  }
}

class InitializerAttribute implements IAttribute, IInitializer {

  public initialize(target: IInvocation, parameters: ArrayLike<any>): any {
    return target.invoke(parameters);
  }

  getInitializer() {
    return this;
  }

}

class Base {

}


describe('core.initializers.invocation', () => {

  describe('# should not able to', () => {

    it('decorate initializer on method using decorateClassField', () => {

      expect(() => {

        @agent()
        class Tester01 extends Base {

          @decorateClassField(new InitializerAttribute())
          test() {
          }

        }

        new Tester01();

      }).toThrowError('InitializerAttribute can only decorate on class field property')

    });

    it('decorate initializer on method using decorateClassMethod', () => {

      expect(() => {

        @agent()
        class Tester02 extends Base {

          @decorateClassMethod(new InitializerAttribute())
          test() {
          }

        }

        new Tester02();

      }).toThrowError('Class: Tester02; Property: test; Initializer not work with field property')

    });

    it('decorate initializer on method using decorateClassMember', () => {

      expect(() => {

        @agent()
        class Tester03 extends Base {

          @decorateClassMember(new InitializerAttribute())
          test() {
          }

        }

        new Tester03();

      }).toThrowError('Class: Tester03; Property: test; Initializer not work with field property')

    });

    it('decorate interceptor on field', () => {

      expect(() => {

        @agent()
        class Tester04 extends Base {

          @decorateClassField(new InterceptorAttribute())
          field

        }

        new Tester04();

      }).toThrowError('Class: Tester04; Property: field; Interceptor not work with field property without Initializer')

    });

  });

  describe('# should able to', () => {

    it('decorate initializer', () => {

      class InitializerAttribute implements IAttribute, IInitializer {

        initialize(target: IInvocation, parameters: ArrayLike<any>): any {
          return 1000;
        }

        getInitializer() {
          return this;
        }

      }

      @agent()
      class Tester05 extends Base {
        @decorateClassField(new InitializerAttribute())
        field;
      }

      // should able to create t he class with null initializer
      const instance = new Tester05();

      expect(instance instanceof Tester05).toBeTruthy();
      expect(instance.field).toBe(1000);

    });

    it('decorate null initializer', () => {

      class FakeInitializerAttribute implements IAttribute {

        getInitializer() {
          return null;
        }

      }

      @agent()
      class Tester06 extends Base {
        @decorateClassField(new FakeInitializerAttribute())
        field;
      }

      // should able to create the class with null initializer
      const instance = new Tester06();

      expect(instance instanceof Tester06).toBeTruthy();

    });

  })

});
