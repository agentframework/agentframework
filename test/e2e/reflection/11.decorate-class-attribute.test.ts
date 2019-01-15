import 'jasmine';
import { Agent, AgentAttribute, decorateAgent, decorateClassMember, IsAgent, Reflector } from '../../../src/lib';
import { RandomAttribute } from '../attributes/RandomAttribute';
import { RoundAttribute } from '../attributes/RoundAttribute';
import { MetadataAttribute } from '../attributes/MetadataAttribute';
import { BadAgentChecker } from '../attributes/BadAgentChecker';
import { BadRandomAttribute } from '../attributes/BadRandomAttribute';

@decorateAgent(new BadAgentChecker(), [new BadRandomAttribute()])
class MongoDB {
  connection: any;

  connect() {
    return 'connected';
  }

  @decorateClassMember(new RandomAttribute())
  random: Date;

  @decorateClassMember(new RandomAttribute())
  @decorateClassMember(new RoundAttribute())
  both: any;

  @decorateClassMember(new MetadataAttribute())
  metadata: any;

  @decorateClassMember(new RoundAttribute())
  round(): any {}
}

describe('Decorate Class 222', () => {
  describe('# should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(MongoDB)).toBe(false);
    });

    it('re-upgrade agent', () => {
      expect(Agent(MongoDB, new BadAgentChecker())).toBe(MongoDB);
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
      const items = Reflector(MongoDB).getAttributes(AgentAttribute);
      expect(items.length).toBe(0);
    });
  });
});
