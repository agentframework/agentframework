/* tslint:disable */

import { decorateMember, Reflector } from '../../../packages/dependencies/agent';
import { RandomInterceptor } from '../1.attributes/RandomInterceptor';
import { RoundInterceptor } from '../1.attributes/RoundInterceptor';
import { MetadataAttribute } from '../1.attributes/MetadataAttribute';
import { AgentAttribute } from '../../../packages/dependencies/agent';

class MongoDB {
  @decorateMember(new RandomInterceptor())
  random!: Date;

  @decorateMember(new RandomInterceptor())
  @decorateMember(new RoundInterceptor())
  both: any;

  @decorateMember(new MetadataAttribute())
  metadata: any;

  @decorateMember(new RoundInterceptor())
  round(): any {}
}

// class Influx {
//   @decorateClassMember(new MetadataAttribute())
//   metadata!: Date;
// }

class Redis {
  @decorateMember(new RandomInterceptor())
  random!: Date;
}

class MySQL {
  @decorateMember(new RandomInterceptor())
  random!: Date;

  @decorateMember(new RoundInterceptor())
  round(): any {}
}

class SQLServer {
  @decorateMember(new RoundInterceptor())
  round(): any {}
}

describe('Reflection', () => {
  describe('# should able to', () => {
    it('get class prototype', () => {
      expect(Reflector(MongoDB).declaringType.prototype).toBe(MongoDB.prototype);
    });
  });

  describe('# should not able to', () => {
    it('get agent attribute', () => {
      expect(Reflector(MongoDB).getOwnAttributes(AgentAttribute).length).toBe(0);
    });

    it('get agent target', () => {
      expect(Reflector(MongoDB).type).toBe(MongoDB.prototype.constructor);
    });

    it('get agents', () => {
      expect(Reflector(MongoDB).getOwnProperties().length).toBe(4);
    });

    it('get agents', () => {
      expect(Reflector(MongoDB).findOwnProperties(p => p.hasOwnInterceptor()).length).toBe(3);
    });

    // it('get no agents', () => {
    //   expect(Reflector(MongoDB).findOwnProperties(p => p.hasParameterInterceptor()).length).toBe(0);
    // });

    // it('get metadata', () => {
    //   expect(Reflector(Influx).hasOwnMetadata()).toBe(false);
    // });

    it('get Initializer', () => {
      // expect(Reflector(Redis).hasOwnMetadata()).toBe(false);
      expect(Reflector(Redis).hasOwnInterceptor()).toBe(false);
      // expect(Reflector(Redis).hasParameterInterceptor()).toBe(false);
    });

    it('get Interceptor', () => {
      // expect(Reflector(SQLServer).hasOwnMetadata()).toBe(false);
      expect(Reflector(SQLServer).hasOwnInterceptor()).toBe(false);
      // expect(Reflector(SQLServer).hasParameterInterceptor()).toBe(false);
    });

    it('get Altered', () => {
      // expect(Reflector(MySQL).hasOwnMetadata()).toBe(false);
      expect(Reflector(MySQL).hasOwnInterceptor()).toBe(false);
      // expect(Reflector(MySQL).hasParameterInterceptor()).toBe(false);
    });
  });
});
