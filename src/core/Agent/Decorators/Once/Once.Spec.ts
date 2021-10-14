import { once } from './Once';

describe('Remember!', () => {
  describe('# should able to', () => {
    it('get same value', () => {
      class Store1 {
        @once()
        static get date3() {
          return new Date();
        }

        @once()
        get date1() {
          return new Date();
        }

      }

      class Store2 {
        @once()
        static get date3() {
          return new Date();
        }

        @once()
        get date1() {
          return new Date();
        }

      }

      const store11 = new Store1();
      const store12 = new Store1();
      const store2 = new Store1();

      expect(store11.date1).toBe(store11.date1);
      expect(store11.date1).not.toBe(store12.date1);

      expect(Store1.date3).toBe(Store1.date3);
      expect(Store1.date3).not.toBe(Store2.date3);

      expect(store11.date1).not.toBe(store2.date1);
    });
  });
});
