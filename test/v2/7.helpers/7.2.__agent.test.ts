import { __agent } from '../../../src/dependencies/core';

class ClassA {}

class ClassAB {}

describe('7.2. __agent helper', () => {
  describe('# should able', () => {
    it('return new type from decorator', () => {
      const result = __agent(
        [
          function (type: Function) {
            return ClassAB;
          },
        ],
        ClassA
      );
      expect(result).toBe(ClassAB);
    });

    it('return original type', () => {
      const result = __agent(
        [
          function (type: Function) {
          },
        ],
        ClassA
      );
      expect(result).toBe(ClassA);
    });
  });
});
