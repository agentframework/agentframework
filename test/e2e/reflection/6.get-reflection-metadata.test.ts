/* tslint:disable */

import { decorateClassProperty, Reflector } from '../../../lib';
import { RandomInterceptor } from '../attributes/RandomInterceptor';
import { RoundInterceptor } from '../attributes/RoundInterceptor';

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
      expect(() => {
        new fn(MongoDB);
      }).toThrow();
    });

    it('Reflector number', () => {
      expect(() => {
        Reflector(<any>1);
      }).toThrow();
    });
    it('Reflector number', () => {
      expect(() => {
        Reflector(<any>null);
      }).toThrow();
    });
    it('Reflector number', () => {
      expect(() => {
        Reflector({});
      }).toThrow();
    });

    it('Reflector prototype', () => {
      const fr = Reflector(MongoDB.prototype);
      expect(fr).toBeTruthy();
    });
  });
});
