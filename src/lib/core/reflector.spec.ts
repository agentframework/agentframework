import { Reflector } from './reflector';


describe('Reflector', () => {
  
  describe('# should not able to', () => {

    it('get reflection on non-object', () => {
      expect(() => {
        const instance = Reflector('Class');
        console.log('[SHOULD_NEVER_SEEM_THIS]', instance);
      }).toThrowError();
    });

  });
  
});
