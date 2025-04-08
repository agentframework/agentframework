/* tslint:disable */
import { agent } from 'agentframework';
import { decorateMember, decorateParameter } from '../../../packages/dependencies/agent';
import { InjectAttribute, InjectParameterAttribute } from '../1.attributes/InjectAttribute';

class Connection {
  static count = 0;
  state = 'offline';

  constructor() {
    // expect(arguments.length).toBe(2);
    // expect(arguments[0]).toBe('test');
    // expect(arguments[1]).toBe('default');
    // // console.log('Connection(', arguments[0], ')');
    // expect(Array.prototype.slice.call(arguments, 0)).toEqual(['test', 'default']);

    Connection.count++;
  }
}

class Database {
  static count = 0;
  state = 'offline';

  constructor() {
    // console.log('Database(', arguments, ')');
    // expect(arguments.length).toBe(2);
    // expect(arguments[0]).toBe('test');
    // expect(arguments[1]).toBe('default');
    // expect(arguments[1] instanceof Connection).toBeTruthy();
    Database.count++;
  }
}

@agent()
class MongoDB {
  @decorateMember(new InjectAttribute())
  database!: Database;
  connection!: Connection;
  user: string;

  constructor(user: string, @decorateParameter(new InjectParameterAttribute()) conn?: Connection) {
    // expect(arguments.length).toBe(2);
    // expect(user).toBe('test');
    // expect(conn).toBeTruthy();
    // expect(conn instanceof Connection).toBeTruthy();
    // console.log('MongoDB(', arguments, ')');
    this.user = user;
    if (conn) {
      this.connection = conn;
    }
  }
}

describe('Initializer for Constructor Parameter', () => {
  describe('# should able to', () => {
    // it('create with injected connection', () => {
    //   expect(Connection.count).toBe(0);
    //   const db = new MongoDB('test', 'default' as any);
    //   expect(db).toBeTruthy();
    //   expect(db.user).toBe('test');
    //   expect(db.connection).toBeTruthy();
    //   expect(db.connection).toBeInstanceOf(Connection);
    //   expect(Connection.count).toBe(1);
    // });

    it('create with injected database', () => {
      expect(Database.count).toBe(0);
      const db = new MongoDB('test', 'default' as any);
      expect(db.database).toBeTruthy();
      expect(db.database instanceof Database).toBeTruthy();
      expect(Database.count).toBe(2);
    });
  });
});
