import { agent } from '../agent'
import { failure } from './failure'

@agent('FailureAgent')
class TestFailureAgentClass {
  
  @failure(null)
  testNull() {
    throw new Error()
  }
  
  @failure(0)
  testZero() {
    throw new Error()
  }
  
  @failure('')
  testEmptyString() {
    throw new Error()
  }
  
}

describe('@failure', () => {
  
  describe('# should able to', () => {
    
    it('get null when throw', () => {
      const failureAgent = new TestFailureAgentClass();
      expect(failureAgent.testNull()).toBe(null);
    });
  
    it('get 0 when throw', () => {
      const failureAgent = new TestFailureAgentClass();
      expect(failureAgent.testZero()).toBe(0);
    });
    
    it('get empty string when throw', () => {
      const failureAgent = new TestFailureAgentClass();
      expect(failureAgent.testEmptyString()).toBe('');
    });
    
  });
  
});
