import { agent } from '../../src/lib';
import {
  fakeClassMemberDecorator,
  fakeClassDecorator,
  fakeClassMethodDecorator,
  fakeClassPropertyDecorator, PropertyDecoratorAttribute
} from './fake';
import { decorateParameter } from '../../src/lib/core/decorator';


describe('Fake Decorator', () => {

  describe('# should able to', () => {

    it('decorate on method', () => {

      @agent()
      class TestClass {
        
        @fakeClassMemberDecorator()
        testMethod(@decorateParameter() first: boolean, @decorateParameter() second: TestClass): TestClass {
          return this;
        }
        
      }

      const test = new TestClass();
      expect(test.testMethod(null, null)).toEqual(test);
    });

    it('decorate on class', () => {

      @agent()
      @fakeClassDecorator()
      class TestClass {
        _testMethod: string = 'test';
        testMethod() {
          return this._testMethod;
        }
      }

      const test = new TestClass();
      expect(test.testMethod()).toEqual('test');
    });

    it('decorate on class method', () => {

      @agent()
      class TestClass {
        _testMethod: string = 'test';

        @fakeClassMethodDecorator()
        testMethod() {
          return this._testMethod;
        }
      }

      const test = new TestClass();
      expect(test.testMethod()).toEqual('test');
    });

    it('decorate on class property', () => {

      @agent()
      class TestClass {

        @fakeClassPropertyDecorator()
        _testMethod: string = 'test';

        testMethod() {
          return this._testMethod;
        }
      }

      const test = new TestClass();
      expect(test.testMethod()).toEqual('test');
    });
  });

});
