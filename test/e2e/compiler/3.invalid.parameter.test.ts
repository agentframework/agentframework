import 'jasmine';
import { agent, Agent, decorateParameter, IsAgent, Reflector } from '../../../src/lib';
import { MetadataAttribute } from '../attributes/MetadataAttribute';

class Connection {
  constructor() {
    Connection.count++;
  }
  static count = 0;
  state = 'offline';
}

@agent()
class MongoDB {
  constructor(@decorateParameter(new MetadataAttribute()) conn?: Connection) {
    if (conn) this.connection = conn;
  }
  connection: Connection;
}

describe('Initializer in Parameter', () => {
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
        .getAttributes(MetadataAttribute);
      expect(items.length).toBe(1);
    });
  });

  describe('# should not able to', () => {
    it('get injected value', () => {
      const db = new MongoDB();
      expect(db.connection).toBeUndefined();
    });
  });
});
