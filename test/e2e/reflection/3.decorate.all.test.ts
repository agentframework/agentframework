import { Agent, decorate, IsAgent, Target } from '../../../src/lib';
import { MetadataAttribute } from '../attributes/MetadataAttribute';

/**
 *   Constructor = 1,
 ConstructorParameter = 2,
 Field = 4,
 Method = 8,
 MethodParameter = 16,
 Getter = 32,
 Setter = 64
 */
const a = new MetadataAttribute();
const AllTargets =
  Target.Constructor |
  Target.ConstructorParameter |
  Target.Field |
  Target.Method |
  Target.MethodParameter |
  Target.Setter |
  Target.Getter;
describe('decorate() and All Target', () => {
  describe('# should able to', () => {
    it('decorate agent', () => {
      @decorate(a, AllTargets)
      class MongoDB {
        @decorate(a, AllTargets)
        random: Date;

        constructor(p1: number, @decorate(a, AllTargets) p2: Date) {}

        @decorate(a, AllTargets)
        round(p1: string, @decorate(a, AllTargets) p2: Date): any {}

        @decorate(a, AllTargets)
        get dob(): Date {
          return new Date();
        }

        @decorate(a, AllTargets)
        set date(d: Date) {
          console.log('set', d);
        }
      }

      const MongoDB$ = Agent(MongoDB);
      expect(MongoDB$).not.toBe(MongoDB);
      expect(IsAgent(MongoDB$)).toBeTruthy();
    });

    it('decorate class field 2', () => {
      function MongoDB() {}
      Reflect.defineProperty(MongoDB.prototype, 'random', { value: 1 });
      const descr = Reflect.getOwnPropertyDescriptor(MongoDB.prototype, 'random');
      // another kind of class and decorator
      decorate(a, AllTargets)(MongoDB.prototype, 'random', descr);
    });

    it('not decorate agent', () => {
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
