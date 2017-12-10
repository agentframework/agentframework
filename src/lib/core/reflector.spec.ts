import { Reflector } from './reflector';

class Tester {

}

describe('Reflector', () => {
  
  describe('# should able to', () => {
    
    it('get reflection using instance', () => {
      const ins = new Tester();
      const ref = Reflector(ins);
      expect(ref.origin).toBe(Tester.prototype);
    });
    
    it('get reflection using constructor', () => {
      const ref = Reflector(Object.prototype.constructor);
      expect(ref.origin).toBe(Object.prototype);
    });
    
    it('get reflection using prototype', () => {
      const ref = Reflector(Object.prototype);
      expect(ref.origin).toBe(Object.prototype);
    });
    
    it('get reflection using Object', () => {
      const ref = Reflector(Object);
      expect(ref.origin).toBe(Object.prototype);
    });
    
  });
  
  describe('# should not able to', () => {

    it('get reflection using string', () => {
      expect(() => {
        const instance = Reflector('hashkey');
        console.log('[SHOULD_NEVER_SEEM_THIS]', instance);
      }).toThrowError();
    });
    
    it('new a Reflector', () => {
      expect(() => {
        const instance = Reflect.construct(Reflector, [Tester]);
        console.log('[SHOULD_NEVER_SEEM_THIS]', instance);
      }).toThrowError();
    });
  
    it('get reflection on null', () => {
      expect(() => {
        const instance = Reflector(null);
        console.log('[SHOULD_NEVER_SEEM_THIS]', instance);
      }).toThrowError();
    });
  

    
  });
  
});
