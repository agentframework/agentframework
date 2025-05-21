/* tslint:disable */

import { agent } from '../../../lib/dependencies/agent';
import { methodDecorator } from './method';

describe('Method Decorator', () => {
  describe('# should able to', () => {
    it('decorate on method', () => {
      @agent()
      class TestMethodDecoratorAtClassMethod {
        _testMethod: string = 'test';
        @methodDecorator()
        testMethod() {
          return this._testMethod;
        }
      }
      const test = new TestMethodDecoratorAtClassMethod();
      expect(test.testMethod()).toEqual('test');
    });

    it('decorate on getter', () => {
      @agent()
      class TestMethodDecoratorAtPropertyGetter {
        _testMethod: string = 'test';
        @methodDecorator()
        get testMethod() {
          return this._testMethod;
        }
      }
      const test = new TestMethodDecoratorAtPropertyGetter();
      expect(test.testMethod).toEqual('test');
    });

    it('decorate on setter', () => {
      @agent()
      class TestMethodDecoratorAtPropertySetter {
        _testMethod!: number;
        @methodDecorator()
        set testMethod(value: number) {
          this._testMethod = value;
        }
      }
      const test = new TestMethodDecoratorAtPropertySetter();
      test.testMethod = 123;
      expect(test._testMethod).toEqual(123);
    });
  });
});
