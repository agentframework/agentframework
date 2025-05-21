/* tslint:disable */

import { AgentFrameworkError, decorateMember, Reflector } from '../../../lib/dependencies/agent';
import { RandomInterceptor } from '../1.attributes/RandomInterceptor';
import { RoundInterceptor } from '../1.attributes/RoundInterceptor';

class MongoDB {
  @decorateMember(new RandomInterceptor())
  rnd1: any;

  @decorateMember(new RoundInterceptor())
  connect() {
    return 'connected';
  }
}

describe('Reflection get metadata ', () => {
  describe('# should able to', () => {
    it('search by feature', () => {
      expect(Reflector(MongoDB).property('rnd2').type).toBeUndefined();
    });
  });

  describe('# should no able to', () => {
    it('new Reflector', () => {
      const fn: any = Reflector;
      expect(new fn(MongoDB).constructor.name).toBe('OnDemandTypeInfo');
    });

    it('Reflector number', () => {
      expect(() => {
        Reflector(<any>1);
      }).toThrowError(AgentFrameworkError, 'NotSupported: Reflector(number) is not supported');
    });
    it('Reflector null', () => {
      expect(() => {
        Reflector(<any>null);
      }).toThrowError(AgentFrameworkError, 'NotSupported: Reflector(null) is not supported');
    });
    it('Reflector object', () => {
      expect(() => {
        Reflector({});
      }).toThrowError(AgentFrameworkError, 'NotSupported: Reflector(Object {}) is not supported');
    });

    it('Reflector static', () => {
      expect(Reflector(MongoDB).static.type).toBe(MongoDB);
    });

    it('Reflector class prototype', () => {
      expect(Reflector(MongoDB.prototype)).toBe(Reflector(MongoDB));
    });

    it('Reflector instance', () => {
      const m = new MongoDB();
      expect(() => {
        Reflector(m);
      }).toThrowError(AgentFrameworkError, 'NotSupported: Reflector(MongoDB {}) is not supported');
    });
  });
});
