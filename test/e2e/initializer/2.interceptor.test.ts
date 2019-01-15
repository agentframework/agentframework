
import {
  agent,
  Agent,
  AgentAttribute,
  decorateClassField,
  decorateClassMember,
  IsAgent,
  Reflector
} from '../../../src/lib';
import { RandomAttribute } from '../attributes/RandomAttribute';
import { RoundAttribute } from '../attributes/RoundAttribute';

@agent()
class MongoDB {
  _age: number;

  @decorateClassField(new RandomAttribute())
  @decorateClassField(new RoundAttribute())
  version: number;

  @decorateClassMember(new RoundAttribute())
  get score(): number {
    return 1.4;
  }

  @decorateClassMember(new RoundAttribute())
  set age(val: number) {
    this._age = val;
  }
  get age(): number {
    return this._age;
  }
}

describe('Initializer and Interceptor', () => {
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

    it('get initializer attribute', () => {
      const items = Reflector(MongoDB)
        .property('version')
        .value.getAttributes(RandomAttribute);
      expect(items.length).toBe(1);
    });

    it('get interceptor attribute', () => {
      const items = Reflector(MongoDB)
        .property('version')
        .value.getAttributes(RoundAttribute);
      expect(items.length).toBe(1);
    });

    it('get injected value', () => {
      const db = new MongoDB();
      expect(db).toBeTruthy();
      expect(db.version).toBeTruthy();
    });

    it('get intercepted value', () => {
      const db = new MongoDB();
      db.age = 3.4;
      expect(db.age).toBe(3);
    });
  });

  describe('# should not able to', () => {
    it('get agent attribute', () => {
      const items = Reflector(MongoDB).getAttributes(AgentAttribute);
      expect(items.length).toBe(0);
    });
  });
});
