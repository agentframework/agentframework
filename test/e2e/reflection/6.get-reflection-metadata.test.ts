/* tslint:disable */

import { decorateMember, NotImplementedError, Reflector } from '../../../lib';
import { RandomInterceptor } from '../attributes/RandomInterceptor';
import { RoundInterceptor } from '../attributes/RoundInterceptor';
import { OnDemandTypeInfo } from '../../../src/core/Core/Reflection/OnDemandTypeInfo';
import { NotSupportedError } from '../../../src/core/Core/Error/NotSupportedError';

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
      expect(new fn(MongoDB)).toBeInstanceOf(OnDemandTypeInfo);
    });

    it('Reflector number', () => {
      expect(() => {
        Reflector(<any>1);
      }).toThrowError(NotSupportedError, 'Reflector(number) is not supported');
    });
    it('Reflector null', () => {
      expect(() => {
        Reflector(<any>null);
      }).toThrowError(NotSupportedError, 'Reflector(null) is not supported');
    });
    it('Reflector object', () => {
      expect(() => {
        Reflector({});
      }).toThrowError(NotImplementedError, 'Reflector(Object {}) is not implemented yet');
    });

    it('Reflector static', () => {
      expect(Reflector(MongoDB).static.type).toBe(MongoDB);
    });

    it('Reflector class prototype', () => {
      expect(Reflector(MongoDB.prototype)).toBe(Reflector(MongoDB));
    });

    it('Reflector prototype ', () => {
      expect(Reflector(MongoDB).prototype).toBe(Reflector(MongoDB));
    });

    it('Reflector instance', () => {
      const m = new MongoDB();
      expect(() => {
        Reflector(m);
      }).toThrowError(NotImplementedError, 'Reflector(MongoDB {}) is not implemented yet');
    });
  });
});
