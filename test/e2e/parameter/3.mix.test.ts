/* tslint:disable */

import { agent, Agent, decorateClassField, decorateParameter, IsAgent } from '../../../src/lib';
import { InjectAttribute } from '../attributes/InjectAttribute';

class Connection {
  static count = 0;
  state = 'offline';
  constructor() {
    expect(arguments[0]).toBe('default');
    expect(arguments[1]).toBe(1);
    expect(Array.prototype.slice.call(arguments[2], 0)).toEqual(['test', 'default']);
    // console.log('Connection(', arguments[0], ')');
    Connection.count++;
  }
}

class Database {
  static count = 0;
  state = 'offline';
  constructor() {
    // console.log('Database(', arguments, ')');
    expect(arguments.length).toBe(2);
    expect(arguments[0]).toBe('test');
    expect(arguments[1]).toBeTruthy();
    expect(arguments[1] instanceof Connection).toBeTruthy();
    Database.count++;
  }
}

@agent()
class MongoDB {
  @decorateClassField(new InjectAttribute())
  database: Database;
  connection: Connection;
  user: string;
  constructor(user: string, @decorateParameter(new InjectAttribute()) conn?: Connection) {
    expect(arguments.length).toBe(2);
    expect(user).toBe('test');
    expect(conn).toBeTruthy();
    expect(conn instanceof Connection).toBeTruthy();
    // console.log('MongoDB(', arguments, ')');
    this.user = user;
    if (conn) { this.connection = conn; }
  }
}

describe('Initializer for Constructor Parameter', () => {
  describe('# should able to', () => {
    it('upgrade class', () => {
      expect(IsAgent(MongoDB)).toBe(true);
    });

    it('re-upgrade class', () => {
      expect(Agent(MongoDB)).toBe(MongoDB);
    });

    it('create with injected connection', () => {
      expect(Connection.count).toBe(0);
      const db = new MongoDB('test', 'default' as any);
      expect(db).toBeTruthy();
      expect(db.user).toBe('test');
      expect(db.connection).toBeTruthy();
      expect(db.connection instanceof Connection).toBeTruthy();
      expect(Connection.count).toBe(1);
    });

    it('create with injected database', () => {
      expect(Database.count).toBe(0);
      const db = new MongoDB('test', 'default' as any);
      expect(db.database).toBeTruthy();
      expect(db.database instanceof Database).toBeTruthy();
      expect(Database.count).toBe(1);
    });
  });
});
