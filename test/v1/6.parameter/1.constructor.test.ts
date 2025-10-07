/* tslint:disable */
import { agent } from 'agentframework';
import { decorateParameter, Reflector } from '../../../packages/dependencies/agent';
import { InjectParameterAttribute } from '../1.attributes/InjectAttribute';

class Connection1611 {
  static count = 0;
  state = 'offline';

  constructor() {
    expect(typeof arguments[0]).toBe('string');
    // console.log('Connection(', arguments[0], ')');
    Connection1611.count++;
  }
}

@agent()
class MongoDB1611 {
  connection!: Connection1611;
  user: string;

  constructor(user: string, @decorateParameter(new InjectParameterAttribute()) conn?: Connection1611) {
    expect(conn).toBeInstanceOf(Connection1611);
    // console.log('MongoDB(', arguments, ')');
    this.user = user;
    if (conn) {
      this.connection = conn;
    }
  }
}

@agent()
class Redis1611 {
  user: string;

  constructor(
    user: string,
    @decorateParameter(new InjectParameterAttribute()) conn1?: Connection1611,
    @decorateParameter(new InjectParameterAttribute()) conn2?: Connection1611
  ) {
    expect(conn1 instanceof Connection1611).toBe(true);
    expect(conn2 instanceof Connection1611).toBe(true);
    expect(conn1).not.toBe(conn2);
    // console.log('Redis(', arguments, ')');
    this.user = user;
  }
}

describe('Initializer for Constructor Parameter', () => {
  describe('# should able to', () => {
    it('get version', () => {
      expect(Reflector(MongoDB1611).version).toBe(0);
    });

    it('create with injected connection', () => {
      expect(Connection1611.count).toBe(0);
      const db = new MongoDB1611('test', 'default' as any);
      expect(db).toBeTruthy();
      expect(db.user).toBe('test');
      expect(db.connection).toBeTruthy();
      expect(db.connection instanceof Connection1611).toBeTruthy();
      expect(Connection1611.count).toBe(1);
    });

    it('create with 2 injected connection', () => {
      const db = new Redis1611('test', 'default' as any, 'default2' as any);
      expect(db).toBeTruthy();
    });
  });
});
