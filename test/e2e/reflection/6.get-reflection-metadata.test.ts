/* tslint:disable */

import { decorateClassMember, Reflector } from '../../../src/lib';
import { RandomAttribute } from '../attributes/RandomAttribute';
import { RoundAttribute } from '../attributes/RoundAttribute';

class MongoDB {
  @decorateClassMember(new RandomAttribute())
  rnd1: any;

  @decorateClassMember(new RoundAttribute())
  connect() {
    return 'connected';
  }
}

describe('Reflection get metadata ', () => {
  describe('# should able to', () => {
    it('search by feature', () => {
      const a = Reflector(MongoDB)
        .property('rnd2')
        .getMetadata('design:type');
      expect(a).toBeUndefined();
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
        Reflector(1);
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
