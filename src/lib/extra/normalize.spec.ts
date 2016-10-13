import { agent } from '../agent'
import { normalize } from './normalize';

@agent('NormalizeAgent')
class TestNormalizeAgentClass {
  
  private _testField: any;
  
  @normalize()
  testFieldWithValue: any = 1102;
  
  constructor() {
    this._testField = 1000;
    this.testFieldWithValue = 2000;
  }
  
  @normalize()
  get test(): any {
    return this._testField;
  }
  
  @normalize()
  testReturnValue(): any {
    return 1102
  }
  
  @normalize()
  testReturnArray(): any {
    return [1101, 1102, 1103]
  }
  
  @normalize()
  testThrowError(): any {
    throw new Error('october')
  }
  
}

describe('@normalize', () => {
  
  describe('# should able to', () => {
    
    it('get result', () => {
      const outputAgent = new TestNormalizeAgentClass();
      expect(outputAgent.testReturnValue()).toBeDefined();
      expect(outputAgent.testReturnValue()).toEqual({ ok: 1, result: 1102 });
    });
    
    it('get results', () => {
      const outputAgent = new TestNormalizeAgentClass();
      expect(outputAgent.testReturnArray()).toBeDefined();
      expect(outputAgent.testReturnArray()).toEqual({ ok: 1, results: [1101, 1102, 1103] });
    });
    
    it('get result from field', () => {
      const outputAgent = new TestNormalizeAgentClass();
      expect(outputAgent.test).toEqual({ ok: 1, result: 1000 });
    });
    
    it('get result from initialized field', () => {
      const outputAgent = new TestNormalizeAgentClass();
      expect(outputAgent.testFieldWithValue).toEqual({ ok: 1, result: 2000 });
    });
    
    it('get error', () => {
      const outputAgent = new TestNormalizeAgentClass();
      expect(outputAgent.testThrowError()).toBeDefined();
      expect(outputAgent.testThrowError()).toEqual({ ok: 0, message: 'october' });
    });
    
  });
  
});
