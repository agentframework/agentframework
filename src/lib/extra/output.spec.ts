import { agent } from '../agent'
import { output } from './output';

@agent('OutputAgent')
class TestOutputAgentClass {
  
  private _testField: any;
  
  @output()
  testFieldWithValue: any = 1102;
  
  constructor() {
    this._testField = 1000;
    this.testFieldWithValue = 2000;
  }
  
  @output()
  get test(): any {
    return this._testField;
  }

  @output()
  testOutput(): any {
    return 1102
  }
  
  @output()
  testOutputError(): any {
    throw new Error('october')
  }
  
}

describe('@output', () => {
  
  describe('# should able to', () => {
    
    it('get result', () => {
      const outputAgent = new TestOutputAgentClass();
      expect(outputAgent.testOutput()).toBeDefined();
      expect(outputAgent.testOutput()).toEqual({result: 1102, error: null});
    });
    
    it('get result from field', () => {
      const outputAgent = new TestOutputAgentClass();
      expect(outputAgent.test).toEqual({result: 1000, error: null});
    });
    
    it('get result from initialized field', () => {
      const outputAgent = new TestOutputAgentClass();
      expect(outputAgent.testFieldWithValue).toEqual({result: 2000, error: null});
    });

    it('get error', () => {
      const outputAgent = new TestOutputAgentClass();
      expect(outputAgent.testOutputError()).toBeDefined();
      expect(outputAgent.testOutputError()).toEqual({result: null, error: new Error('october')});
    });
    
  });
  
});
