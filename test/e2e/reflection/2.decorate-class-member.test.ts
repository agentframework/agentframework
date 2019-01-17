/* tslint:disable */

import { AgentFeatures, decorateClassMember, Reflector } from '../../../src/lib';
import { RandomAttribute } from '../attributes/RandomAttribute';
import { RoundAttribute } from '../attributes/RoundAttribute';
import { MetadataAttribute } from '../attributes/MetadataAttribute';

class MongoDB {
  @decorateClassMember(new RandomAttribute())
  rnd1: Date;

  @decorateClassMember(new RandomAttribute())
  @decorateClassMember(new RoundAttribute())
  both: any;

  @decorateClassMember(new MetadataAttribute())
  books: any;

  @decorateClassMember(new RoundAttribute())
  connect(a: Date, b: RegExp): boolean {
    return true;
  }

  @decorateClassMember(new RoundAttribute())
  logs(): any { }

  @decorateClassMember(new RoundAttribute())
  logs2(): any { }
}

describe('Reflection Class Member', () => {
  describe('# should able to', () => {
    it('get method return type', () => {
      expect(Reflector(MongoDB).property('connect').value.paramtypes).toEqual([Date, RegExp]);
    });

    it('get method param type', () => {
      expect(Reflector(MongoDB).property('connect').value.returntype).toBe(Boolean);
    });

    it('get method return type', () => {
      expect(Reflector(MongoDB).property('connect').paramtypes).toEqual([Date, RegExp]);
    });

    it('get method param type', () => {
      expect(Reflector(MongoDB).property('connect').returntype).toBe(Boolean);
    });

    it('Initializer only', () => {
      const p = Reflector(MongoDB).property('books');
      expect(p.hasFeatures(AgentFeatures.Initializer)).toBe(false);
      expect(p.hasFeatures(AgentFeatures.Initializer)).toBe(false);
      expect(p.hasFeatures(AgentFeatures.Initializer | AgentFeatures.Interceptor)).toBe(false);
    });

    it('both', () => {
      const p = Reflector(MongoDB).property('both');
      expect(p.hasFeatures(AgentFeatures.Initializer)).toBe(true);
      expect(p.hasFeatures(AgentFeatures.Interceptor)).toBe(true);
      expect(p.hasFeatures(AgentFeatures.Initializer)).toBe(true);
      expect(p.hasFeatures(AgentFeatures.Interceptor)).toBe(true);
      expect(p.hasFeatures(AgentFeatures.Initializer | AgentFeatures.Interceptor)).toBe(true);
      expect(p.hasFeatures(AgentFeatures.Initializer | AgentFeatures.Interceptor)).toBe(true);
    });

    it('Interceptor only', () => {
      const p = Reflector(MongoDB).property('logs');
      expect(p.hasFeatures(AgentFeatures.Interceptor)).toBe(true);
      expect(p.hasFeatures(AgentFeatures.Interceptor)).toBe(true);
      expect(p.hasFeatures(AgentFeatures.Altered)).toBe(true);
    });
    it('Interceptor only 2', () => {
      const p = Reflector(MongoDB).property('logs2');
      expect(p.hasFeatures(AgentFeatures.Initializer | AgentFeatures.Interceptor)).toBe(true);
    });

    it('Interceptor only 3', () => {
      const p = Reflector(MongoDB).property('logs2');
      expect(p.hasFeatures(AgentFeatures.Initializer | AgentFeatures.Interceptor)).toBe(true);
    });

    it('Interceptor only 4', () => {
      const p = Reflector(MongoDB).property('books');
      expect(p.hasFeatures(AgentFeatures.Metadata)).toBe(true);
      expect(p.hasFeatures(AgentFeatures.Interceptor)).toBe(false);
      expect(p.hasFeatures(AgentFeatures.Initializer)).toBe(false);
      expect(p.hasFeatures(AgentFeatures.Interceptor | AgentFeatures.Initializer)).toBe(false);
    });

    it('Initializer only 1', () => {
      const p = Reflector(MongoDB).property('rnd1');
      expect(p.hasFeatures(AgentFeatures.Metadata)).toBe(true);
      expect(p.hasFeatures(AgentFeatures.Interceptor)).toBe(false);
      expect(p.hasFeatures(AgentFeatures.Initializer)).toBe(true);
      expect(p.hasFeatures(AgentFeatures.Interceptor | AgentFeatures.Initializer)).toBe(true);
    });
  });

  describe('# should not able to', () => {
    it('get 3rd param for getter', () => {
      expect(() => {
        Reflector(MongoDB)
          .property('rnd1')
          .getter.parameter(3);
      }).toThrow();
    });
  });
});
