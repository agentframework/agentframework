import { IAttribute } from './attribute';
import { decorateClassField, decorateClassMember } from './decorator';
import { Reflector } from './reflector';
import { PropertyFilters } from './filters';
import { AgentFeatures } from './compilerOptions';
import { IInterceptor } from './interceptor';
import { IInvocation } from './invocation';

describe('core.filters', () => {
  describe('# should able to', () => {
    it('filter property using Attribute', () => {
      class GuestAttribute implements IAttribute {
        constructor(public identifier: string) {}
      }

      class MemberAttribute implements IAttribute, IInterceptor {
        constructor(public identifier: string) {}

        getInterceptor() {
          return this;
        }

        intercept(target: IInvocation, parameters: ArrayLike<any>): any {
          return target.invoke(parameters);
        }
      }

      class AdminAttribute implements IAttribute {
        constructor(public identifier: string) {}
      }

      class FilterTest01 {
        @decorateClassField(new GuestAttribute('1'))
        @decorateClassMember(new GuestAttribute('2'))
        @decorateClassMember(new GuestAttribute('3'))
        guest1;

        @decorateClassField(new GuestAttribute('21'))
        @decorateClassMember(new GuestAttribute('22'))
        @decorateClassMember(new GuestAttribute('23'))
        guest2;

        @decorateClassField(new MemberAttribute('m1'))
        @decorateClassMember(new MemberAttribute('m2'))
        @decorateClassMember(new MemberAttribute('m3'))
        member1;
      }

      const type = Reflector(FilterTest01);

      expect(type.findProperties(PropertyFilters.FilterAttribute, AdminAttribute)).toEqual([]);

      expect(type.findProperties(PropertyFilters.FilterAttribute, GuestAttribute).map(p => p.targetKey)).toEqual([
        'guest1',
        'guest2'
      ]);

      expect(type.findProperties(PropertyFilters.FilterAttribute, MemberAttribute).map(p => p.targetKey)).toEqual([
        'member1'
      ]);

      expect(type.findProperties(PropertyFilters.FilterFeatures, AgentFeatures.Initializer)).toEqual([]);
      expect(
        type.findProperties(PropertyFilters.FilterFeatures, AgentFeatures.Interceptor).map(p => p.targetKey)
      ).toEqual(['member1']);
    });
  });
});
