/* tslint:disable */

import { agent } from '../../../src/dependencies/agent';
import { decorateParameter, IsAgent, Reflector } from '../../../src/dependencies/agent';
import { MetadataAttribute } from '../1.attributes/MetadataAttribute';
import { CreateAgent } from '../../../src/dependencies/agent';

class Connection {
  static count = 0;
  state = 'offline';
  constructor() {
    Connection.count++;
  }
}

@agent()
class MongoDB {
  connection!: Connection;
  constructor(@decorateParameter(new MetadataAttribute()) conn?: Connection) {
    if (conn) {
      this.connection = conn;
    }
  }
}

describe('Initializer in Parameter', () => {
  describe('# should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(MongoDB)).toBeTrue();
    });

    it('re-upgrade agent', () => {
      expect(IsAgent(CreateAgent(MongoDB))).toBeTrue();
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
        .getParameters()[0]
        .getOwnAttributes(MetadataAttribute);
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
