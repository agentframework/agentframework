import { agent } from '../agent'
import { cache } from './cache';

@agent()
class TestAgentClass {

  numberOfCalls: number = 0;

  @cache(10)
  heavyOperation(): any {
    let x = 2;
    while (x < 100000000000) {
      x = x * x;
    }
    this.numberOfCalls++;
    return x;
  }

  @cache(10)
  heavyOperationWithArguments(name: string, score: number): any {
    let x = 2 + score + name.toString().length;
    while (x < 100000) {
      x = x * x;
    }
    this.numberOfCalls++;
    return x;
  }

}

describe('@cache', () => {
  describe('# should able to', () => {

    it('cache the result for heavyOperation', () => {
      const tester = new TestAgentClass();
      const first = tester.heavyOperation();
      for (let n = 0; n < 10000; n++) {
        const val = tester.heavyOperation();
        expect(val).toEqual(first);
      }
      expect(tester.numberOfCalls).toBeLessThan(10000);
    });

    it('cache the result for heavyOperationWithArguments', () => {
      const tester = new TestAgentClass();
      const first = tester.heavyOperationWithArguments('ling', 55);
      for (let n = 0; n < 10000; n++) {
        const val = tester.heavyOperationWithArguments('ling', 55);
        expect(val).toEqual(first);
      }
      expect(tester.numberOfCalls).toBeLessThan(10000);
    });

  });

});
