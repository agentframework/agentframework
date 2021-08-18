/* tslint:disable */

import { decorateMember, decorateParameter, Reflector } from '../../../src';
import { RandomInterceptor } from '../attributes/RandomInterceptor';
import { RoundInterceptor } from '../attributes/RoundInterceptor';
import { MetadataAttribute } from '../attributes/MetadataAttribute';

class MongoDB {
  @decorateMember(new RandomInterceptor())
  rnd1!: Date;

  @decorateMember(new RandomInterceptor())
  @decorateMember(new RoundInterceptor())
  both: any;

  @decorateMember(new MetadataAttribute())
  books: any;

  @decorateMember(new RoundInterceptor())
  connect(
    @decorateParameter(new RoundInterceptor()) a: Date,
    @decorateParameter(new RoundInterceptor()) b: RegExp
  ): boolean {
    return true;
  }

  @decorateMember(new RoundInterceptor())
  logs(): any {}

  @decorateMember(new RoundInterceptor())
  logs2(): any {}
}

describe('Reflection Class Member', () => {
  describe('# should able to', () => {
    it('get method return type', () => {
      expect(Reflector(MongoDB).property('connect').getParameters()[0].type).toEqual(Date);
      expect(Reflector(MongoDB).property('connect').getParameters()[1].type).toEqual(RegExp);
    });

    it('get method param type', () => {
      expect(Reflector(MongoDB).property('connect').type).toBe(Boolean);
    });

    it('get method param type', () => {
      const params = Reflector(MongoDB)
        .property('connect')
        .getParameters()
        .map((p) => p.type);
      expect(params).toEqual([Date, RegExp]);
    });

    it('get method return type', () => {
      expect(Reflector(MongoDB).property('connect').type).toBe(Boolean);
    });

    it('Initializer only', () => {
      const p = Reflector(MongoDB).property('books');
      expect(p.hasInterceptor()).toBe(false);
    });

    it('both', () => {
      const p = Reflector(MongoDB).property('both');
      expect(p.hasInterceptor()).toBe(true);
    });

    it('Interceptor only', () => {
      const p = Reflector(MongoDB).property('logs');
      expect(p.hasInterceptor()).toBe(true);
    });
    it('Interceptor only 2', () => {
      const p = Reflector(MongoDB).property('logs2');

      expect(p.hasInterceptor()).toBe(true);
    });

    it('Interceptor only 3', () => {
      const p = Reflector(MongoDB).property('logs2');

      expect(p.hasInterceptor()).toBe(true);
    });

    it('Interceptor only 4', () => {
      const p = Reflector(MongoDB).property('books');
      expect(p.hasInterceptor()).toBe(false);
    });

    it('Initializer only 1', () => {
      const p = Reflector(MongoDB).property('rnd1');
      expect(p.hasInterceptor()).toBe(true);
    });
  });

  describe('# should not able to', () => {
    it('get 3rd param for getter', () => {
      expect(Reflector(MongoDB).property('rnd1').getParameters().length).toBe(0);
      expect(Reflector(MongoDB).property('rnd1').getParameters()[0]).toBeUndefined();
    });
  });
});
