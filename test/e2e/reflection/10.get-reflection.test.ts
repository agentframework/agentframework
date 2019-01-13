import {
  AgentAttribute,
  AgentFeatures,
  decorateClassMember,
  PropertyFilters,
  Reflector
} from '../../../src/lib';
import { RandomAttribute } from '../attributes/RandomAttribute';
import { RoundAttribute } from '../attributes/RoundAttribute';
import { MetadataAttribute } from '../attributes/MetadataAttribute';

class MongoDB {
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

describe('Reflection', () => {
  describe('# should able to', () => {
    it('get class prototype', () => {
      expect(Reflector(MongoDB).type).toBe(MongoDB.prototype);
    });
  });

  describe('# should not able to', () => {
    it('get agent attribute', () => {
      const items = Reflector(MongoDB).getAttributes(AgentAttribute);
      expect(items.length).toBe(0);
    });

    it('get agent target', () => {
      expect(Reflector(MongoDB).target).toBe(MongoDB.prototype.constructor);
    });

    it('get agents', () => {
      expect(Reflector(MongoDB).properties()).toBeTruthy();
    });

    it('get agents', () => {
      expect(
        Reflector(MongoDB).findOwnProperties(PropertyFilters.FilterFeatures, AgentFeatures.Interceptor)
      ).toBeTruthy();
    });
  });
});
