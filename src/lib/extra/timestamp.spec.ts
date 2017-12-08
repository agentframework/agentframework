import { agent } from '../agent'
import { timestamp } from './timestamp';

@agent()
class TestTimestampAgentClass {

  _name: string;

  @timestamp()
  get name(): string {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }

  homepage: string;

  @timestamp()
  get activated(): boolean {
    return this._activated;
  }

  set activated(value) {
    this._activated = value
  }

  get untimestamp(): boolean {
    return this._activated;
  }

  set untimestamp(value) {
    this._activated = value
  }

  timestamp: number;

  private _activated: boolean = true;
  private _status: boolean = this._activated;

}

describe('@timestamp', () => {

  describe('# should not', () => {

    it('read timestamp of changing non-timestamp field', () => {
      const timestampAgent = new TestTimestampAgentClass();
      timestampAgent.homepage = 'https://github.com/agentframework/agentframework';
      expect(timestampAgent.timestamp).toBeUndefined();
      expect(timestampAgent.homepage).toEqual('https://github.com/agentframework/agentframework');
    });

    it('read timestamp of changing non-timestamp getter/setter', () => {
      const timestampAgent = new TestTimestampAgentClass();
      timestampAgent.untimestamp = true;
      expect(timestampAgent.timestamp).toBeUndefined();
      expect(timestampAgent.untimestamp).toEqual(true);
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

    it('read timestamp of changing getter/setter', () => {
      const timestampAgent = new TestTimestampAgentClass();
      timestampAgent.activated = true;
      expect(timestampAgent.timestamp).toBeDefined();
      expect(timestampAgent.activated).toEqual(true);
    });

  });

});
