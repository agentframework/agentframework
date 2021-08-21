/* tslint:disable */

import { decorateMember, IsAgent, Reflector, decorateClass, AgentFrameworkError } from '../../../src/dependencies/core';
import { RandomInterceptor } from '../attributes/RandomInterceptor';
import { RoundInterceptor } from '../attributes/RoundInterceptor';
import { MetadataAttribute } from '../attributes/MetadataAttribute';
import { BadAgentChecker } from '../attributes/BadAgentChecker';
import { BadRandomAttribute } from '../attributes/BadRandomAttribute';
import { AgentAttribute, CreateAgent } from '../../../src/dependencies/core';

@decorateClass(new BadRandomAttribute())
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

describe('Decorate class attribute', () => {
  describe('# should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(MongoDB)).toBe(false);
    });

    it('re-upgrade agent', () => {
      expect(() => {
        CreateAgent(MongoDB, new BadAgentChecker());
      }).toThrowError(AgentFrameworkError, 'NoPermissionToCreateAgent');
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
