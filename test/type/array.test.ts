import { agent, timestamp } from '../../src/lib';

describe('Array', () => {
  
  describe('# should able to', () => {
    
    it('decorate on method', () => {
      
      @agent()
      class ArrayClass extends Array {
        @timestamp()
        name:string = 'test';
        timestamp: number;
      }
      
      const test = new ArrayClass();
      test[0] = 'good';
      test.name = 'welcome';
      expect(test[0]).toEqual('good');
    });
    
  });
  
});
