import { agent } from '../agent'
import { output } from './output';

@agent('OutputAgent')
class TestOutputAgentClass {
  
  @output()
  testProperty: any = 1103;
  
  @output()
  test(): any {
    return 1102
  }
  
  @output()
  testError(): any {
    throw new Error('october')
  }
  
}

describe('@output', () => {
  
  describe('# should able to', () => {
    
    it('get result', () => {
      const outputAgent = new TestOutputAgentClass();
      expect(outputAgent.test()).toBeDefined();
      expect(outputAgent.test()).toEqual({result: 1102, error: null});
    });
    
    // it('get result from field', () => {
    //   const outputAgent = new TestOutputAgentClass();
    //   expect(outputAgent.testProperty).toBeDefined();
    //   expect(outputAgent.testProperty).toEqual({result: 1103, error: null});
    // });

    it('get error', () => {
      const outputAgent = new TestOutputAgentClass();
      expect(outputAgent.testError()).toBeDefined();
      expect(outputAgent.testError()).toEqual({result: null, error: new Error('october')});
    });
    
  });
  
});
