import { decorateMember, decorateParameter, MemberKinds, Reflector } from '../../../src/dependencies/agent';

describe('6.10. Parameter decorator', () => {
  describe('# should able to', () => {
    it('get property descriptor', () => {
      class Class610A {
        test610A(@decorateParameter({ id: 1 }) a: number) {}
      }

      const a = Reflector(Class610A).property('test610A');
      expect(a.descriptor).toBeDefined();
    });

    it('get property descriptor', () => {
      class Class610B {
        @decorateMember({ id: 2 })
        test610B(a: number) {}
      }
      const b = Reflector(Class610B).property('test610B');
      expect(b.descriptor).toBeDefined();
    });

    it('get property descriptor', () => {
      class Class610C {
        @decorateMember({ id: 3 })
        test610C(@decorateParameter({ id: 4 }) a: number) {}
      }

      // console.log('Knowledge', Knowledge.add(Class610C.prototype)['test610C']);
      const c = Reflector(Class610C).property('test610C');
      expect(c.descriptor).toBeDefined();
    });

    it('get property descriptor', () => {
      class Class610D {
        @decorateMember({ id: 5 })
        test610D: number = 1;
      }
      const d = Reflector(Class610D).property('test610D');
      expect(d.descriptor).toBeUndefined();
      expect(d.kind).toBe(MemberKinds.Property);
    });
  });
});
