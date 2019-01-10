import {
  agent,
  Agent,
  AgentAttribute,
  decorateClassField,
  decorateParameter,
  IsAgent,
  Reflector
} from '../../../src/lib';
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
  constructor(@decorateParameter(new InjectAttribute()) conn?: Connection) {
    this.connection = conn;
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
        .parameter(0)
        .getAttributes(InjectAttribute);
      expect(items.length).toBe(1);
    });

    it('get injected value', () => {
      const db = new MongoDB();
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
