/* tslint:disable */

import { decorateMember, Reflector } from '../../../src/dependencies/agent';
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
      expect(Reflector(MongoDB).getAttributes().length).toBe(0);
    });
    it('check specified attribute', () => {
      expect(Reflector(MongoDB).property('connect').hasAttribute(RandomInterceptor)).toBe(false);
    });
    it('check all attributes', () => {
      expect(Reflector(MongoDB).hasAttribute()).toBe(false);
    });

    it('check not attributes', () => {
      expect(Reflector(MongoDB).property('rnd1').hasAttribute()).toBe(true);
    });
  });
});
