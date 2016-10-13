import { agent } from '../agent'
import { success } from './success';
import { timestamp } from './timestamp';

@agent('TimestampAgent')
class TestTimestampAgentClass {
  
  private _activated: boolean = true;
  private _status: boolean = this._activated;
  
  @timestamp()
  name: string;
  
  homepage: string;
  
  get activated(): boolean {
    return this._activated;
  }
  
  set activated(value) {
    this._activated = value
  }
  
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
    
    it('read timestamp of changing non-timestamp getter/setter', () => {
      const timestampAgent = new TestTimestampAgentClass();
      timestampAgent.activated = true;
      expect(timestampAgent.timestamp).toBeUndefined();
      expect(timestampAgent.activated).toEqual(true);
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
