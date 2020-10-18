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

describe('Reflection get attribute ', () => {
  describe('# should able to', () => {
    it('get all attributes', () => {
      expect(Reflector(MongoDB).getOwnAttributes().length).toBe(0);
    });
    it('check specified attribute', () => {
      expect(
        Reflector(MongoDB)
          .property('connect')
          .hasOwnAttribute(RandomInterceptor)
      ).toBe(false);
    });
    it('check all attributes', () => {
      expect(Reflector(MongoDB).hasOwnAttribute()).toBe(false);
    });

    it('check not attributes', () => {
      expect(
        Reflector(MongoDB)
          .property('rnd1')
          .hasOwnAttribute()
      ).toBe(true);
    });
  });
});
