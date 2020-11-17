/* tslint:disable */

import { AgentAttribute, decorateMember, Reflector } from '../../../lib';
import { RandomInterceptor } from '../attributes/RandomInterceptor';
import { RoundInterceptor } from '../attributes/RoundInterceptor';
import { MetadataAttribute } from '../attributes/MetadataAttribute';

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
      expect(Reflector(MongoDB).type.prototype).toBe(MongoDB.prototype);
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
      expect(Reflector(MongoDB).findOwnProperties((p) => p.hasInterceptor()).length).toBe(3);
    });

    // it('get no agents', () => {
    //   expect(Reflector(MongoDB).findOwnProperties(p => p.hasParameterInterceptor()).length).toBe(0);
    // });

    // it('get metadata', () => {
    //   expect(Reflector(Influx).hasOwnMetadata()).toBeFalse();
    // });

    it('get Initializer', () => {
      // expect(Reflector(Redis).hasOwnMetadata()).toBeFalse();
      expect(Reflector(Redis).hasInterceptor()).toBeFalse();
      // expect(Reflector(Redis).hasParameterInterceptor()).toBeFalse();
    });

    it('get Interceptor', () => {
      // expect(Reflector(SQLServer).hasOwnMetadata()).toBeFalse();
      expect(Reflector(SQLServer).hasInterceptor()).toBeFalse();
      // expect(Reflector(SQLServer).hasParameterInterceptor()).toBeFalse();
    });

    it('get Altered', () => {
      // expect(Reflector(MySQL).hasOwnMetadata()).toBeFalse();
      expect(Reflector(MySQL).hasInterceptor()).toBeFalse();
      // expect(Reflector(MySQL).hasParameterInterceptor()).toBeFalse();
    });
  });
});
