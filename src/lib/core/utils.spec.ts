import { Reflection } from './reflection';
import { IAttribute } from './attribute';
import { IInterceptor } from './interceptor';
import { ToPropertyKey } from './utils';


describe('Utils', () => {
  
  describe('# should able to', () => {

    it('compare ', () => {
      const key = ToPropertyKey(Symbol.for('test'));
      expect(key).toEqual(Symbol.for('test'));
    });

  });

});
