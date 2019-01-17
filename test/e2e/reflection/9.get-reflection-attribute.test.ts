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

describe('Reflection get attribute ', () => {
  describe('# should able to', () => {
    it('get all attributes', () => {
      expect(Reflector(MongoDB).getAttributes().length).toBe(0);
    });
    it('check specified attribute', () => {
      expect(
        Reflector(MongoDB)
          .property('connect')
          .hasAttribute(RandomAttribute)
      ).toBe(false);
    });
    it('check all attributes', () => {
      expect(Reflector(MongoDB).hasAttribute()).toBe(false);
    });

    it('check not attributes', () => {
      expect(
        Reflector(MongoDB)
          .property('rnd1')
          .hasAttribute()
      ).toBe(true);
    });
  });
});
