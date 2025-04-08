import { agent } from 'agentframework';
import { once } from './Once';

describe('Once!', () => {
  describe('# should able to', () => {
    it('get same value', () => {
      let n = 0;

      @agent()
      class Store1 {
        @once()
        static get date3() {
          return n++;
        }

        @once()
        get date1() {
          return n++;
        }
      }

      @agent()
      class Store2 {
        @once()
        static get date3() {
          return n++;
        }

        @once()
        get date1() {
          return n++;
        }
      }

      const store11 = new Store1();
      const store12 = new Store1();
      const store2 = new Store2();

      expect(store11.date1).toBe(store11.date1);
      expect(store11.date1).not.toBe(store12.date1);

      expect(Store1.date3).not.toBe(Store1.date3);
      expect(Store1.date3).not.toBe(Store2.date3);

      expect(store11.date1).not.toBe(store2.date1);
    });
  });

  describe('# should not able to', () => {
    it('only cache undefined value', () => {
      let n = -1;

      @agent()
      class Store2 {
        @once()
        get value1() {
          n++;
          if (!n) {
            return undefined;
          } else {
            return n;
          }
        }
      }

      const store11 = new Store2();

      expect(store11.value1).not.toBe(store11.value1);
      expect(store11.value1).toBe(store11.value1);
      expect(store11.value1).toBe(1);
    });
  });
});
