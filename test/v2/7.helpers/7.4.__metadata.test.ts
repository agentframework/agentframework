import { __agent, __decorate, __metadata, __param } from '../../../src/dependencies/core';
import { MemberKinds, Reflector } from '../../../src/dependencies/agent';

class ClassA {
  run(num: Number, name: string): boolean {
    return false;
  }
  name!: string;

  get size(): number {
    return 0;
  }
}

describe('7.4. __agent helper', () => {
  describe('# should able', () => {
    it('decorate class method', () => {
      const result = __decorate(
        [
          __metadata('design:type', Function),
          __metadata('design:paramtypes', [Number, String]),
          __metadata('design:returntype', Boolean),
        ],
        ClassA.prototype,
        'run',
        null
      );
      expect(result).toBeUndefined();
      expect(Reflector(ClassA).property('run').kind).toBe(MemberKinds.Property);
      expect(Reflector(ClassA).property('run').type).toBe(Boolean);
      expect(Reflector(ClassA).property('run').parameter(0).type).toBe(Number);
      expect(Reflector(ClassA).property('run').parameter(1).type).toBe(String);
    });

    it('decorate class field', () => {
      const result = __decorate([__metadata('design:type', String)], ClassA.prototype, 'name', void 0);
      expect(result).toBeUndefined();
      expect(Reflector(ClassA).property('name').kind).toBe(MemberKinds.Property);
      expect(Reflector(ClassA).property('name').type).toBe(String);
      expect(Reflector(ClassA).property('name').getParameters().length).toBe(0);
    });

    it('decorate class getter', () => {
      const result = __decorate(
        [__metadata('design:type', Number), __metadata('design:paramtypes', [])],
        ClassA.prototype,
        'size',
        null
      );
      expect(result).toBeUndefined();
      expect(Reflector(ClassA).property('size').kind).toBe(MemberKinds.Property);
      expect(Reflector(ClassA).property('size').type).toBe(Number);
      expect(Reflector(ClassA).property('size').getParameters().length).toBe(0);
    });

    it('decorate class', () => {
      const ClassAB = __agent(
        [__param(2, function () {}), __metadata('design:paramtypes', [String, void 0, Number])],
        ClassA
      );
      expect(ClassAB).toBe(ClassA);
      expect(Reflector(ClassAB).kind).toBe(MemberKinds.Class);
      expect(Reflector(ClassAB).type).toBe(ClassA);
      expect(Reflector(ClassAB).parameterTypes).toBeDefined();
      expect(Reflector(ClassAB).parameterTypes!.length).toBe(3);
    });
  });
});
