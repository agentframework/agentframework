import { agent } from '../agent'
import { success } from './success';
import { timestamp } from './timestamp';

@agent('TimestampAgent')
class TestTimestampAgentClass {
  
  @timestamp()
  name: string;
  
  timestamp: number;
  
}

describe('@timestamp', () => {
  
  describe('# should able to', () => {
    
    it('read timestamp of last value changes', () => {
      const timestampAgent = new TestTimestampAgentClass();
      timestampAgent.name = 'Ling Zhang';
      expect(timestampAgent.timestamp).toBeDefined();
    });
    
  });
  
});
