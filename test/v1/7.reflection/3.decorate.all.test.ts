/* tslint:disable */

import { decorate, IsAgent, MemberKinds } from '../../../packages/dependencies/agent';
import { CreateAgent } from '../../../packages/dependencies/agent';
import { MetadataAttribute } from '../1.attributes/MetadataAttribute';

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
const AllTargets = MemberKinds.Class | MemberKinds.Parameter | MemberKinds.Property;
describe('decorate() and All Target', () => {
  describe('# should able to', () => {
    it('decorate agent', () => {
      @decorate(a, AllTargets)
      class MongoDB {
        @decorate(a, AllTargets)
        random!: Date;

        constructor(p1: number, @decorate(a, AllTargets) p2: Date) {}

        @decorate(a, AllTargets)
        round(p1: string, @decorate(a, AllTargets) p2: Date): any {}

        @decorate(a, AllTargets)
        get dob(): Date {
          return new Date();
        }

        @decorate(a, AllTargets)
        set date(d: Date) {
          // console.log('set', d);
        }
      }

      const MongoDB$ = CreateAgent(MongoDB);
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
      @decorate(a, MemberKinds.Class)
      class MongoDB {
        @decorate(a, MemberKinds.Property)
        random!: Date;

        constructor(p1: number, @decorate(a, MemberKinds.Parameter) p2: Date) {}

        @decorate(a, MemberKinds.Property)
        round(p1: string, @decorate(a, MemberKinds.Parameter) p2: Date): any {}

        @decorate(a, MemberKinds.Property)
        get dob(): Date {
          return new Date();
        }

        @decorate(a, MemberKinds.Property)
        set date(d: Date) {
          // console.log('set', d);
        }
      }

      const MongoDB$ = CreateAgent(MongoDB);
      expect(MongoDB$).not.toBe(MongoDB);
      expect(IsAgent(MongoDB$)).toBeTruthy();
    });
  });
});
