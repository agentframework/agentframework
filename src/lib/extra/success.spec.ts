import { agent } from '../agent'
import { success } from './success';

@agent('SuccessAgent')
class TestSuccessAgentClass {
  
  bool: boolean = false;
  
  @success('bool', true)
  testBool(): any {
    return 1102
  }
  
  @success('bool', true)
  testBoolNotSatisfy(): any {
    throw new Error('december')
  }
  
}

describe('@success', () => {
  
  describe('# should not', () => {
    
    it('change bool value when throw', () => {
      const successAgent = new TestSuccessAgentClass();
      expect(successAgent.bool).toEqual(false);
      expect(() => {
        successAgent.testBoolNotSatisfy()
      }).toThrowError('december');
      expect(successAgent.bool).toEqual(false);
    });
    
  });
  
  describe('# should able to', () => {
    
    it('change bool value after success called', () => {
      const successAgent = new TestSuccessAgentClass();
      expect(successAgent.bool).toEqual(false);
      expect(successAgent.testBool()).toBeDefined();
      expect(successAgent.bool).toEqual(true);
    });
    
  });
  
});
