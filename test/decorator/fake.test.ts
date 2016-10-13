import { agent } from '../../src/lib';
import { fakeDecorator } from './fake';

describe('Fake Decorator', () => {
  
  describe('# should able to', () => {
    
    it('decorate on method', () => {
      
      @agent()
      class TestMethodDecoratorAtClassMethod {
        _testMethod:string = 'test';
        @fakeDecorator()
        testMethod() {
          return this._testMethod;
        }
      }
      
      const test = new TestMethodDecoratorAtClassMethod();
      expect(test.testMethod()).toEqual('test');
    });
    
    
  });
  
});
