/* tslint:disable */

import { decorateMember, Reflector } from '../../../../release';
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

describe('Reflection get attribute ', () => {
  describe('# should able to', () => {
    it('get all attributes', () => {
      expect(Reflector(MongoDB).getOwnAttributes().length).toBe(0);
    });
    it('check specified attribute', () => {
      expect(Reflector(MongoDB).property('connect').hasOwnAttribute(RandomInterceptor)).toBe(false);
    });
    it('check all attributes', () => {
      expect(Reflector(MongoDB).hasOwnAttribute()).toBe(false);
    });

    it('check not attributes', () => {
      expect(Reflector(MongoDB).property('rnd1').hasOwnAttribute()).toBe(true);
    });
  });
});
