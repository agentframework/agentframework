/* tslint:disable */

import { agent, decorateClass, decorateMember, IsAgent, Reflector } from '../../../lib';
import { RandomInterceptor } from '../attributes/RandomInterceptor';
import { RoundInterceptor } from '../attributes/RoundInterceptor';
import { MetadataAttribute } from '../attributes/MetadataAttribute';
import { AgentChecker } from '../attributes/AgentChecker';
import { AgentAttribute, CreateAgent, GetAgentType } from '../../../src/core';

@agent()
@decorateClass(new AgentChecker())
class MongoDB {
  connection: any;

  @decorateMember(new RandomInterceptor())
  random!: Date;

  @decorateMember(new RandomInterceptor())
  @decorateMember(new RoundInterceptor())
  both: any;

  @decorateMember(new MetadataAttribute())
  metadata: any;

  connect() {
    return 'connected';
  }

  @decorateMember(new RoundInterceptor())
  round(): any {}
}

describe('Decorate Class', () => {
  describe('# should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(MongoDB)).toBe(true);
    });

    it('re-upgrade agent', () => {
      expect(GetAgentType(CreateAgent(MongoDB))).not.toBe(MongoDB);
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
