import { GetPrototypeArray, IsEqual, ToPropertyKey } from './utils';


describe('Utils', () => {
  
  describe('# should able to', () => {
    
    it('ToPropertyKey ', () => {
      const key = ToPropertyKey(Symbol.for('test'));
      expect(key).toEqual(Symbol.for('test'));
    });
    
    it('GetPrototypeArray', () => {
      
      class A {
      }
      
      class B extends A {
      }
      
      class C extends B {
      }
      
      const c = new C();
      const array = GetPrototypeArray(c);
      
      expect(array.length).toEqual(4)
    });
    
  });
  
  describe('IsEqual', () => {
    
    it ('compare number with number', () => {
      expect(IsEqual(0, -0)).toBeTruthy();
      expect(IsEqual(104564562342342424, 104564562342342424)).toBeTruthy();
      expect(IsEqual(-104564562342342424, 104564562342342424)).toBeFalsy();
      expect(IsEqual(-10.4564562342342424, 10.4564562342342424)).toBeFalsy();
      expect(IsEqual(10.4564562342342424, 10.4564562342342424)).toBeTruthy();
    });
    
    it ('compare number with boolean', () => {
  
      expect(IsEqual(-1, true)).toBeTruthy();
      expect(IsEqual(0, true)).toBeFalsy();
      expect(IsEqual(1, true)).toBeTruthy();
  
      expect(IsEqual(-1, false)).toBeFalsy();
      expect(IsEqual(0, false)).toBeTruthy();
      expect(IsEqual(1, false)).toBeFalsy();
      
    });
  
    it ('compare number with null', () => {
  
      expect(IsEqual(1, null)).toBeFalsy();
      expect(IsEqual(0, null)).toBeTruthy();
      expect(IsEqual(-1, null)).toBeFalsy();
      
      expect(IsEqual(1, undefined)).toBeFalsy();
      expect(IsEqual(0, undefined)).toBeTruthy();
      expect(IsEqual(-1, undefined)).toBeFalsy();
      
    });
    
    it ('compare boolean with null', () => {
    
      expect(IsEqual(true, null)).toBeFalsy();
      expect(IsEqual(false, null)).toBeTruthy();
      expect(IsEqual(true, undefined)).toBeFalsy();
      expect(IsEqual(false, undefined)).toBeTruthy();
    
    });
    
    it ('compare string', () => {
    
      expect(IsEqual('', '')).toBeTruthy();
      expect(IsEqual('hi', 'hi')).toBeTruthy();
      expect(IsEqual('', 'hi')).toBeFalsy();
    
    });
    
    it ('compare string with boolean', () => {
    
      expect(IsEqual('', false)).toBeTruthy();
      expect(IsEqual('hi', true)).toBeTruthy();
    
    });
    
    it ('compare string with null', () => {
    
      expect(IsEqual('', null)).toBeTruthy();
      expect(IsEqual('hi', null)).toBeFalsy();
    
    });
  
    it('compare NaN', () => {
  
      expect(IsEqual(NaN, NaN)).toBeTruthy();
      
    });
    
    it('compare Date', () => {
      const d1 = new Date(10), d2 = new Date(10), d3 = new Date(20);
      expect(IsEqual(d1, d2)).toBeTruthy();
      expect(IsEqual(d1, d3)).toBeFalsy();
    });
  
    it('compare Function', () => {
      const f1 = function () {
            },
            f2 = function () {
            },
            f3 = function () {
              let n = 10;
              return n++;
            };
      expect(IsEqual(f1, f2)).toBeTruthy();
      expect(IsEqual(f1, f3)).toBeFalsy();
    });
  
    it('compare RegExp', () => {
      
      expect(IsEqual(new RegExp(`^a$`), new RegExp(`^a$`))).toBeTruthy();
      expect(IsEqual(new RegExp(`^a$`), new RegExp(`^b$`))).toBeFalsy();
    
    });
  
  
  
  
  });
  
  
});
