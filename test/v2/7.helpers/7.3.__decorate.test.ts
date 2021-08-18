import { __decorate } from '../../../src';

class ClassA {
  run(): void {}
  name!: string;
}

describe('7.3. __decorate helper', () => {
  describe('# should able', () => {
    it('decorate class method', () => {
      const result = __decorate(
        [function (type: Function, target: any, key: any, desc: any) {}],
        ClassA.prototype,
        'run',
        null
      );
      expect(result).toBeUndefined();
    });

    it('decorate class field', () => {
      const result = __decorate(
        [function (type: Function, target: any, key: any, desc: any) {}],
        ClassA.prototype,
        'name',
        void 0
      );
      expect(result).toBeUndefined();
    });

    it('modify class field', () => {
      const result = __decorate(
        [
          function (type: Function, target: any, key: any, desc: any) {
            return {
              value: 'AF',
            };
          },
        ],
        ClassA.prototype,
        'name',
        void 0
      );
      expect(result).toBeUndefined();
      const newA = new ClassA();
      expect(newA.name).toBe('AF');
    });
  });
});
