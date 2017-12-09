import { Reflection } from './reflection';
import { IAttribute } from './attribute';
import { IInterceptor } from './interceptor';

describe('Metadata', () => {
  
  describe('', () => {

    it('get reflection on non-object', () => {
      expect(() => {
        const instance = Reflection.getInstance('Class');
        console.log('[SHOULD_NEVER_SEEM_THIS]', instance);
      }).toThrowError();
    });
    
  });

});
