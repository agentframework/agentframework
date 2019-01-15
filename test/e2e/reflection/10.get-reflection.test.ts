import 'jasmine';
import { AgentAttribute, AgentFeatures, decorateClassMember, PropertyFilters, Reflector } from '../../../src/lib';
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

class Influx {
  @decorateClassMember(new MetadataAttribute())
  metadata: Date;
}

class Redis {
  @decorateClassMember(new RandomAttribute())
  random: Date;
}

class MySQL {
  @decorateClassMember(new RandomAttribute())
  random: Date;
  
  @decorateClassMember(new RoundAttribute())
  round(): any {}
}

class SQLServer {
  @decorateClassMember(new RoundAttribute())
  round(): any {}
}


describe('Reflection', () => {
  describe('# should able to', () => {
    it('get class prototype', () => {
      expect(Reflector(MongoDB).prototype).toBe(MongoDB.prototype);
    });
  });

  describe('# should not able to', () => {
    it('get agent attribute', () => {
      const items = Reflector(MongoDB).getAttributes(AgentAttribute);
      expect(items.length).toBe(0);
    });

    it('get agent target', () => {
      expect(Reflector(MongoDB).type).toBe(MongoDB.prototype.constructor);
    });

    it('get agents', () => {
      expect(Reflector(MongoDB).properties()).toBeTruthy();
    });

    it('get agents', () => {
      expect(
        Reflector(MongoDB).findOwnProperties(PropertyFilters.FilterFeatures, AgentFeatures.Interceptor)
      ).toBeTruthy();
    });

    it('get no agents', () => {
      expect(Reflector(MongoDB).findOwnProperties(PropertyFilters.FilterFeatures, AgentFeatures.None)).toBeTruthy();
    });

    it('get metadata', () => {
      expect(Reflector(Influx).hasFeatures(AgentFeatures.Metadata)).toBeTruthy();
    });
  
    it('get Initializer', () => {
      expect(Reflector(Redis).hasFeatures(AgentFeatures.Metadata)).toBeTruthy();
      expect(Reflector(Redis).hasFeatures(AgentFeatures.Initializer)).toBeTruthy();
      expect(Reflector(Redis).hasFeatures(AgentFeatures.Interceptor)).toBeFalsy();
    });
  
    it('get Interceptor', () => {
      expect(Reflector(SQLServer).hasFeatures(AgentFeatures.Metadata)).toBeTruthy();
      expect(Reflector(SQLServer).hasFeatures(AgentFeatures.Interceptor)).toBeTruthy();
      expect(Reflector(SQLServer).hasFeatures(AgentFeatures.Initializer)).toBeFalsy();
    });
  
    it('get Altered', () => {
      expect(Reflector(MySQL).hasFeatures(AgentFeatures.Metadata)).toBeTruthy();
      expect(Reflector(MySQL).hasFeatures(AgentFeatures.Initializer)).toBeTruthy();
      expect(Reflector(MySQL).hasFeatures(AgentFeatures.Interceptor)).toBeTruthy();
      expect(Reflector(MySQL).hasFeatures(AgentFeatures.Altered)).toBeTruthy();
    });
  });
});
