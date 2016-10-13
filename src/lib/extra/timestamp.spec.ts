import { agent } from '../agent'
import { success } from './success';
import { timestamp } from './timestamp';

@agent('TimestampAgent')
class TestTimestampAgentClass {
  
  @timestamp()
  name: string;
  
  homepage: string;
  
  timestamp: number;
  
}

describe('@timestamp', () => {
  
  describe('# should not', () => {
    
    it('read timestamp of changing non-timestamp field', () => {
      const timestampAgent = new TestTimestampAgentClass();
      timestampAgent.homepage = 'https://github.com/agentframework/agentframework';
      expect(timestampAgent.timestamp).toBeUndefined();
      expect(timestampAgent.homepage).toEqual('https://github.com/agentframework/agentframework');
    });
    
    it('read timestamp of changing index field', () => {
      const timestampAgent = new TestTimestampAgentClass();
      timestampAgent[0] = 'agentframework';
      expect(timestampAgent.timestamp).toBeUndefined();
      expect(timestampAgent[0]).toEqual('agentframework');
    });
    
  });
  
  describe('# should able to', () => {
    
    it('read timestamp of last value changes', () => {
      const timestampAgent = new TestTimestampAgentClass();
      timestampAgent.name = 'Ling Zhang';
      expect(timestampAgent.timestamp).toBeDefined();
      expect(timestampAgent.name).toEqual('Ling Zhang');
    });
    
  });
  
});
