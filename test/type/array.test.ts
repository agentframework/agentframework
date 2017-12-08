import { agent, timestamp } from '../../src/lib';

describe('Array', () => {

  describe('# should able to', () => {

    it('decorate on method', () => {

      @agent()
      class ArrayClass extends Array {
  
        _name: string = 'test';

        timestamp: number;
  
        @timestamp()
        get name() {
          return this._name;
        }
        set name(name) {
          this._name = name;
        }
      }

      const test = new ArrayClass();
      test[0] = 'good';
      test.name = 'welcome';
      expect(test[0]).toEqual('good');
    });

  });

});
