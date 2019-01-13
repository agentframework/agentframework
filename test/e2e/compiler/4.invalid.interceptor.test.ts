import { agent, Agent, decorateClassField, IsAgent, Reflector } from '../../../src/lib';
import { InjectAttribute } from '../attributes/InjectAttribute';

@agent()
class MongoDB {
  @decorateClassField(new InjectAttribute())
  connection: number = 1;
}

describe('Invalid Initializer', () => {
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
      const type = Reflector(MongoDB);
      const items = type.property('connection').value.getAttributes(InjectAttribute);
      expect(items.length).toBe(1);
    });

    it('get original value (not injected)', () => {
      const db = new MongoDB();
      expect(db.connection).toBe(1);
    });
  });
});
