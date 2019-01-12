import { Agent, decorateAgent, decorateClassField, agent } from '../../../src/lib';
import { InjectAttribute } from '../attributes/InjectAttribute';
import { AgentTrackerAttribute } from '../attributes/AgentTrackerAttribute';

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

class MongoDB extends Database {
  run(cmd: any) {
    return 8.5;
  }
}

@agent()
class MySQL extends Database {
  run(cmd: any) {
    return 3.1;
  }
}

@decorateAgent(new AgentTrackerAttribute())
class Redis extends Database {
  run(cmd: any) {
    return 1.9;
  }
}

describe('Compiler', () => {
  describe('# should able to', () => {
    it('create using factory', () => {
      const MongoDB$ = Agent(MongoDB);
      const db = new MongoDB$();
      expect(db instanceof MongoDB).toBe(true);
      expect(db instanceof MongoDB$).toBe(true);
      expect(Reflect.getPrototypeOf(db)).toBe(MongoDB$.prototype);
      expect(Reflect.getPrototypeOf(MongoDB$.prototype)).toBe(MongoDB.prototype);
    });

    it('create using custom factory', () => {
      const MongoDB$ = Agent(MongoDB, new AgentTrackerAttribute());
      const db = new MongoDB$();
      expect(db instanceof MongoDB).toBe(true);
      expect(db instanceof MongoDB$).toBe(true);
      expect(Reflect.getPrototypeOf(db)).toBe(MongoDB$.prototype);
      expect(Reflect.getPrototypeOf(MongoDB$.prototype)).toBe(MongoDB.prototype);
    });

    it('create using decorator', () => {
      const MySQL$ = Agent(MySQL);
      const db = new MySQL$();
      expect(db instanceof MySQL).toBe(true);
      expect(db instanceof MySQL$).toBe(true);
      expect(Reflect.getPrototypeOf(db)).toBe(MySQL.prototype);
      expect(MySQL$).toBe(MySQL);
    });

    it('create using custom decorator', () => {
      const Redis$ = Agent(Redis, new AgentTrackerAttribute());
      const db = new Redis$();
      expect(db instanceof Redis).toBe(true);
      expect(db instanceof Redis$).toBe(true);
      expect(Reflect.getPrototypeOf(db)).toBe(Redis.prototype);
      expect(Redis$).toBe(Redis);
    });
  });
});
