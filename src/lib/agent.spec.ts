import { agent } from './agent'

@agent('Agent')
class TestAgentClass {
  
}

describe('@agent', () => {
  
  describe('# not allow to', () => {
    
  });
  
  describe('# should able to', () => {
    
    it('new instance', () => {
      const agent = new TestAgentClass();
      expect(Reflect.getPrototypeOf(agent)).toBe(TestAgentClass.prototype);
      expect(agent instanceof TestAgentClass).toBe(true);
    });
    
    it('construct instance', () => {
      const agent = Reflect.construct(TestAgentClass, []);
      expect(Reflect.getPrototypeOf(agent)).toBe(TestAgentClass.prototype);
      expect(agent instanceof TestAgentClass).toBe(true);
    });
    
  });
  
});
