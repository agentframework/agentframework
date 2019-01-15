import 'jasmine';
import { Agent, decorate, IsAgent, Target } from '../../../src/lib';
import { MetadataAttribute } from '../attributes/MetadataAttribute';
import { DisabledMetadataAttribute } from '../attributes/DisabledMetadataAttribute';

/**
 *   Constructor = 1,
 ConstructorParameter = 2,
 Field = 4,
 Method = 8,
 MethodParameter = 16,
 Getter = 32,
 Setter = 64
 */

describe('decorate() and Target', () => {
  describe('# should able to', () => {
    it('decorate agent', () => {
      const a = new MetadataAttribute();

      @decorate(a, Target.Constructor)
      class MongoDB {
        @decorate(a, Target.Field)
        random: Date;

        constructor(p1: number, @decorate(a, Target.ConstructorParameter) p2: Date) {}

        @decorate(a, Target.Method)
        round(p1: string, @decorate(a, Target.MethodParameter) p2: Date): any {}

        @decorate(a, Target.Getter)
        get dob(): Date {
          return new Date();
        }

        @decorate(a, Target.Setter)
        set date(d: Date) {
          console.log('set', d);
        }
      }

      const MongoDB$ = Agent(MongoDB);
      expect(MongoDB$).not.toBe(MongoDB);
      expect(IsAgent(MongoDB$)).toBeTruthy();
    });

    it('not decorate agent', () => {
      const a = new DisabledMetadataAttribute();

      @decorate(a, Target.Constructor)
      class MongoDB {
        @decorate(a, Target.Field)
        random: Date;

        constructor(p1: number, @decorate(a, Target.ConstructorParameter) p2: Date) {}

        @decorate(a, Target.Method)
        round(p1: string, @decorate(a, Target.MethodParameter) p2: Date): any {}

        @decorate(a, Target.Getter)
        get dob(): Date {
          return new Date();
        }

        @decorate(a, Target.Setter)
        set date(d: Date) {
          console.log('set', d);
        }
      }

      const MongoDB$ = Agent(MongoDB);
      expect(MongoDB$).not.toBe(MongoDB);
      expect(IsAgent(MongoDB$)).toBeTruthy();
    });
  });
});
