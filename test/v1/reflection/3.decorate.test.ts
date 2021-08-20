/* tslint:disable */

import { decorate, IsAgent, MemberKinds } from '../../../src';
import { MetadataAttribute } from '../attributes/MetadataAttribute';
import { DisabledMetadataAttribute } from '../attributes/DisabledMetadataAttribute';
import { CreateAgentClass } from '../../../src';

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

      // @decorate(a, MemberKinds.Constructor)
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

      const MongoDB$ = CreateAgentClass(MongoDB);
      expect(MongoDB$).not.toBe(MongoDB);
      expect(IsAgent(MongoDB$)).toBeTruthy();
    });

    it('not decorate agent', () => {
      const a = new DisabledMetadataAttribute();

      // @decorate(a, MemberKinds.Constructor)
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

      const MongoDB$ = CreateAgentClass(MongoDB);
      expect(MongoDB$).not.toBe(MongoDB);
      expect(IsAgent(MongoDB$)).toBeTruthy();
    });
  });
});
