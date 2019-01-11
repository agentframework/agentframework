import {
  agent,
  Agent,
  AgentAttribute,
  decorateAgent,
  decorateClassField,
  decorateClassMethod,
  IsAgent,
  Reflector
} from '../../../src/lib';
import { InjectAttribute } from '../attributes/InjectAttribute';
import { RoundAttribute } from '../attributes/RoundAttribute';
import { AgentTrackAttribute } from '../attributes/AgentTrackAttribute';
import { AgentBadInterceptorAttribute } from '../attributes/AgentBadInterceptorAttribute';

class Connection {
  constructor() {
    Connection.count++;
  }
  static count = 0;
  state = 'offline';
}

class Database {
  @decorateClassField(new InjectAttribute())
  connection: Connection;
}

@decorateAgent(new AgentTrackAttribute())
class MongoDB extends Database {
  run(cmd: any) {
    return 8.5;
  }
}

describe('Compiler', () => {
  describe('# should able to', () => {
    it('redefine agent', () => {
      const MongoDB$ = Agent(MongoDB, new AgentTrackAttribute());
      const m = new MongoDB$();
      expect(m instanceof MongoDB).toBe(true);
      expect(m instanceof MongoDB$).toBe(true);
      expect(Reflect.getPrototypeOf(m)).toBe(MongoDB$.prototype);
      expect(MongoDB$).toBe(MongoDB);
    });
    
    it('ignore bad agent', () => {
      const MongoDB$ = Agent(MongoDB, new AgentBadInterceptorAttribute());
      const m = new MongoDB$();
      expect(m instanceof MongoDB).toBe(true);
      expect(m instanceof MongoDB$).toBe(true);
      expect(Reflect.getPrototypeOf(m)).toBe(MongoDB$.prototype);
      expect(MongoDB$).toBe(MongoDB);
    });
    
    it('extend agent', () => {
      const MongoDB$ = Agent(MongoDB);
      const m = new MongoDB$();
      expect(m instanceof MongoDB).toBe(true);
      expect(m instanceof MongoDB$).toBe(true);
      expect(Reflect.getPrototypeOf(m)).toBe(MongoDB$.prototype);
      expect(Reflect.getPrototypeOf(MongoDB$.prototype)).toBe(MongoDB.prototype);
    });
  });

  describe('# should not able to', () => {
    it('get agent attribute', () => {});
  });
});
