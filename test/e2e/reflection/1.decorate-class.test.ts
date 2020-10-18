/* tslint:disable */

import {
  agent,
  CreateAgent,
  AgentAttribute,
  decorateClass,
  decorateClassProperty,
  IsAgent,
  Reflector,
  GetType
} from '../../../lib';
import { RandomInterceptor } from '../attributes/RandomInterceptor';
import { RoundInterceptor } from '../attributes/RoundInterceptor';
import { MetadataAttribute } from '../attributes/MetadataAttribute';
import { AgentChecker } from '../attributes/AgentChecker';

@agent()
@decorateClass(new AgentChecker())
class MongoDB {
  connection: any;

  @decorateClassProperty(new RandomInterceptor())
  random!: Date;

  @decorateClassProperty(new RandomInterceptor())
  @decorateClassProperty(new RoundInterceptor())
  both: any;

  @decorateClassProperty(new MetadataAttribute())
  metadata: any;

  connect() {
    return 'connected';
  }

  @decorateClassProperty(new RoundInterceptor())
  round(): any {}
}

describe('Decorate Class', () => {
  describe('# should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(MongoDB)).toBe(true);
    });

    it('re-upgrade agent', () => {
      expect(GetType(CreateAgent(MongoDB))).not.toBe(MongoDB);
    });

    it('new instance', () => {
      const db = new MongoDB();
      expect(db instanceof MongoDB).toBe(true);
      expect(Reflect.getPrototypeOf(db)).toBe(MongoDB.prototype);
    });

    it('construct instance', () => {
      const db = Reflect.construct(MongoDB, []);
      expect(db instanceof MongoDB).toBe(true);
      expect(Reflect.getPrototypeOf(db)).toBe(MongoDB.prototype);
    });
  });

  describe('# should not able to', () => {
    it('get agent attribute', () => {
      const items = Reflector(MongoDB).getOwnAttributes(AgentAttribute);
      expect(items.length).toBe(0);
    });
  });
});
