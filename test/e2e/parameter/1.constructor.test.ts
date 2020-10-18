/* tslint:disable */

import { agent, decorateParameter } from '../../../lib';
import { InjectAttribute } from '../attributes/InjectAttribute';

class Connection {
  static count = 0;
  state = 'offline';
  constructor() {
    expect(typeof arguments[0]).toBe('string');
    // console.log('Connection(', arguments[0], ')');
    Connection.count++;
  }
}

@agent()
class MongoDB {
  connection!: Connection;
  user: string;
  constructor(user: string, @decorateParameter(new InjectAttribute()) conn?: Connection) {
    expect(conn instanceof Connection).toBeTruthy();
    // console.log('MongoDB(', arguments, ')');
    this.user = user;
    if (conn) { this.connection = conn; }
  }
}

@agent()
class Redis {
  user: string;
  constructor(
    user: string,
    @decorateParameter(new InjectAttribute()) conn1?: Connection,
    @decorateParameter(new InjectAttribute()) conn2?: Connection
  ) {
    expect(conn1 instanceof Connection).toBeTruthy();
    expect(conn2 instanceof Connection).toBeTruthy();
    expect(conn1).not.toBe(conn2);
    // console.log('Redis(', arguments, ')');
    this.user = user;
  }
}

describe('Initializer for Constructor Parameter', () => {
  describe('# should able to', () => {
    it('create with injected connection', () => {
      expect(Connection.count).toBe(0);
      const db = new MongoDB('test', 'default' as any);
      expect(db).toBeTruthy();
      expect(db.user).toBe('test');
      expect(db.connection).toBeTruthy();
      expect(db.connection instanceof Connection).toBeTruthy();
      expect(Connection.count).toBe(1);
    });

    it('create with 2 injected connection', () => {
      const db = new Redis('test', 'default' as any, 'default2' as any);
      expect(db).toBeTruthy();
    });
  });
});
