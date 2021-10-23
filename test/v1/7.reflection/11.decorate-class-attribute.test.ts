/* tslint:disable */

import { decorateMember, IsAgent, Reflector, decorateClass, AgentFrameworkError } from '../../../src/dependencies/agent';
import { RandomInterceptor } from '../1.attributes/RandomInterceptor';
import { RoundInterceptor } from '../1.attributes/RoundInterceptor';
import { MetadataAttribute } from '../1.attributes/MetadataAttribute';
import { BadAgentChecker } from '../1.attributes/BadAgentChecker';
import { BadRandomAttribute } from '../1.attributes/BadRandomAttribute';
import { OnDemandAgentAttribute, CreateAgent } from '../../../src/dependencies/agent';

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
      }).toThrowError(AgentFrameworkError, 'NoCreateAgentPermission');
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
      const items = Reflector(MongoDB).getOwnAttributes(OnDemandAgentAttribute);
      expect(items.length).toBe(0);
    });
  });
});
