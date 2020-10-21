/* tslint:disable */

import { decorateClassProperty, NotImplementedError, Reflector } from '../../../lib';
import { RandomInterceptor } from '../attributes/RandomInterceptor';
import { RoundInterceptor } from '../attributes/RoundInterceptor';
import { OnDemandTypeInfo } from '../../../src/core/Core/Reflection/OnDemandTypeInfo';
import { NotSupportedError } from '../../../src/core/Core/NotSupportedError';

class MongoDB {
  @decorateClassProperty(new RandomInterceptor())
  rnd1: any;

  @decorateClassProperty(new RoundInterceptor())
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
      expect(() => {
        Reflector(MongoDB).static;
      }).toThrowError(NotImplementedError, 'Reflector(MongoDB).static is not implemented yet');
    });

    it('Reflector prototype', () => {
      expect(() => {
        Reflector(MongoDB.prototype);
      }).toThrowError(NotImplementedError, 'Reflector(MongoDB.prototype) is not implemented yet');
    });

    it('Reflector instance', () => {
      const m = new MongoDB();
      expect(() => {
        Reflector(m);
      }).toThrowError(NotImplementedError, 'Reflector(MongoDB {}) is not implemented yet');
    });
  });
});
