import 'jasmine';
import { agent, Agent, AgentAttribute, decorateParameter, IsAgent, Reflector } from '../../../src/lib';
import { InjectAttribute } from '../attributes/InjectAttribute';
import { AgentChecker } from '../attributes/AgentChecker';

class Connection {
  constructor() {
    Connection.count++;
  }
  static count = 0;
  state = 'offline';
}

@agent([new AgentChecker()])
class MongoDB {
  constructor(database: string, @decorateParameter(new InjectAttribute()) conn?: Connection) {
    if (conn) this.connection = conn;
  }

  connection: Connection;
}

describe('Initializer in Constructor', () => {
  describe('# should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(MongoDB)).toBe(true);
    });

    it('re-upgrade agent', () => {
      expect(Agent(MongoDB)).toBe(MongoDB);
    });

    it('new instance', () => {
      const db = new MongoDB('test');
      expect(db instanceof MongoDB).toBe(true);
    });

    it('construct instance', () => {
      const db = Reflect.construct(MongoDB, []);
      expect(Reflect.getPrototypeOf(db)).toBe(MongoDB.prototype);
      expect(db instanceof MongoDB).toBe(true);
    });

    it('get inject attribute', () => {
      const items = Reflector(MongoDB)
        .parameter(1)
        .getAttributes(InjectAttribute);
      expect(items.length).toBe(1);
    });

    it('get injected value', () => {
      const db = new MongoDB('test');
      expect(db).toBeTruthy();
      expect(db.connection.state).toBe('offline');
      expect(Reflect.getPrototypeOf(db.connection)).toBe(Connection.prototype);
      expect(db.connection instanceof Connection).toBe(true);
    });

    it('get injected value with Array parameters', () => {
      const db = Reflect.construct(MongoDB, ['test', 1]);
      expect(db).toBeTruthy();
      expect(db.connection.state).toBe('offline');
      expect(Reflect.getPrototypeOf(db.connection)).toBe(Connection.prototype);
      expect(db.connection instanceof Connection).toBe(true);
    });
  });

  describe('# should not able to', () => {
    it('get agent attribute', () => {
      const items = Reflector(MongoDB).getAttributes(AgentAttribute);
      expect(items.length).toBe(0);
    });
  });
});
