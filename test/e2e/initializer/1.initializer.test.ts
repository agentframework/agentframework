import 'jasmine';
import { agent, Agent, AgentAttribute, decorateClassField, IsAgent, Reflector } from '../../../src/lib';
import { InjectAttribute } from '../attributes/InjectAttribute';

class Connection {
  constructor() {
    Connection.count++;
  }
  static count = 0;
  state = 'offline';
}

@agent()
class MongoDB {
  @decorateClassField(new InjectAttribute())
  connection: Connection;

  @decorateClassField(new InjectAttribute())
  connection2: Connection;
}

describe('Initializer', () => {
  describe('# should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(MongoDB)).toBe(true);
    });

    it('re-upgrade agent', () => {
      expect(Agent(MongoDB)).toBe(MongoDB);
    });

    it('new instance', () => {
      const db = new MongoDB();
      expect(db instanceof MongoDB).toBe(true);
    });

    it('construct instance', () => {
      const db = Reflect.construct(MongoDB, []);
      expect(Reflect.getPrototypeOf(db)).toBe(MongoDB.prototype);
      expect(db instanceof MongoDB).toBe(true);
    });

    it('get inject attribute', () => {
      const items = Reflector(MongoDB)
        .property('connection')
        .value.getAttributes(InjectAttribute);
      expect(items.length).toBe(1);
    });

    it('get injected value', () => {
      Connection.count = 0;
      const db = new MongoDB();
      expect(db).toBeTruthy();
      expect(Connection.count).toBe(0);
      const conn = db.connection;
      expect(conn).toBeTruthy();
      expect(Connection.count).toBe(1);
      const conn2 = db.connection;
      expect(Connection.count).toBe(1);
      expect(db.connection2 instanceof Connection).toBeTruthy();
      expect(conn).toBe(conn2);
      expect(db.connection.state).toBe('offline');
      expect(Reflect.getPrototypeOf(conn)).toBe(Connection.prototype);
      expect(conn instanceof Connection).toBe(true);
    });

    it('edit injected value', () => {
      Connection.count = 0;
      const db = new MongoDB();
      expect(db).toBeTruthy();
      expect(Connection.count).toBe(0);
      const newConn = Object.create(null);
      db.connection = newConn;
      expect(db.connection).toBe(newConn);
      expect(Connection.count).toBe(0);
    });
  });

  describe('# should not able to', () => {
    it('get agent attribute', () => {
      const items = Reflector(MongoDB).getAttributes(AgentAttribute);
      expect(items.length).toBe(0);
    });
  });
});
