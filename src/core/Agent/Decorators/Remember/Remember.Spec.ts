import { remember } from './Remember';

describe('Remember!', () => {
  describe('# should able to', () => {
    it('get same value', () => {
      class Store1 {
        @remember('Date3')
        static get date3() {
          return new Date();
        }

        @remember('Date4')
        static get date4() {
          return new Date();
        }

        @remember('Date1')
        get date1() {
          return new Date();
        }

        @remember('Date2')
        get date2() {
          return new Date();
        }
      }

      class Store2 {
        @remember('Date3')
        static get date3() {
          return new Date();
        }

        @remember('Date4')
        static get date4() {
          return new Date();
        }

        @remember('Date1')
        get date1() {
          return new Date();
        }

        @remember('Date2')
        get date2() {
          return new Date();
        }
      }

      const store11 = new Store1();
      const store12 = new Store1();
      const store2 = new Store1();

      expect(store11.date1).toBe(store11.date1);
      expect(store11.date1).not.toBe(store11.date2);
      expect(store11.date1).toBe(store12.date1);
      expect(store11.date1).not.toBe(store12.date2);

      expect(Store1.date3).toBe(Store1.date3);
      expect(Store1.date3).not.toBe(Store1.date4);
      expect(Store1.date3).toBe(Store2.date3);
      expect(Store1.date3).not.toBe(Store2.date4);

      expect(Store1.date4).toBe(Store1.date4);
      expect(Store1.date4).toBe(Store2.date4);

      expect(store11.date1).toBe(store2.date1);
      expect(store11.date2).toBe(store2.date2);
    });
  });
});
