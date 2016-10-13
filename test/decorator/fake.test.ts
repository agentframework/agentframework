import { agent } from '../../src/lib';
import {
  fakeClassMemberDecorator,
  fakeClassDecorator,
  fakeClassMethodDecorator,
  fakeClassPropertyDecorator
} from './fake';


describe('Fake Decorator', () => {
  
  describe('# should able to', () => {
    
    it('decorate on method', () => {
      
      @agent()
      class TestClass {
        _testMethod:string = 'test';
        @fakeClassMemberDecorator()
        testMethod() {
          return this._testMethod;
        }
      }
      
      const test = new TestClass();
      expect(test.testMethod()).toEqual('test');
    });
    
    it('decorate on class', () => {
    
      @agent()
      @fakeClassDecorator()
      class TestClass {
        _testMethod:string = 'test';
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
        _testMethod:string = 'test';
        
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
        _testMethod:string = 'test';
        
        testMethod() {
          return this._testMethod;
        }
      }
    
      const test = new TestClass();
      expect(test.testMethod()).toEqual('test');
    });
  });
  
});
