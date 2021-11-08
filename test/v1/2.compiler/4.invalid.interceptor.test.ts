/* tslint:disable */

import { agent, decorateMember, IsAgent, Reflector } from '../../../src/dependencies/agent';
import { InjectAttribute } from '../1.attributes/InjectAttribute';
import { CreateAgent } from '../../../src/dependencies/agent';

@agent()
class PostgreSQL {
  @decorateMember(new InjectAttribute())
  connection: number = 1241;
}

describe('Invalid Initializer', () => {
  describe('# should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(PostgreSQL)).toBeTrue();
    });

    it('re-upgrade agent', () => {
      expect(IsAgent(CreateAgent(PostgreSQL))).toBeTrue();
    });

    it('get inject attribute', () => {
      const type = Reflector(PostgreSQL);
      const items = type.property('connection').getOwnAttributes(InjectAttribute);
      expect(items.length).toBe(1);
    });

    it('new instance', () => {
      const db = new PostgreSQL();
      expect(db instanceof PostgreSQL).toBe(true);
    });

    it('construct instance', () => {
      const db = Reflect.construct(PostgreSQL, []);
      expect(Reflect.getPrototypeOf(db)).toBe(PostgreSQL.prototype);
      expect(db instanceof PostgreSQL).toBe(true);
    });

    it('get original value (not injected)', () => {
      const db = new PostgreSQL();
      // console.log('DB 0', Reflect.getOwnPropertyDescriptor(db, 'connection'));
      // const s1: any = Reflect.getOwnPropertyDescriptor(db.constructor.prototype, 'connection');
      // console.log('DB 1', s1.get.toString());
      // console.log('DB 1', s1.set.toString());
      // const s2: any = Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(db.constructor.prototype), 'connection');
      // console.log('DB 2', s2.get.toString());
      // console.log('DB 2', s2.set.toString());
      expect(db.connection).toBe(1241);
    });
  });
});
