import { GetPrototypeArray, IsEqual, ToPropertyKey } from './utils';


describe('Utils', () => {
  
  describe('ToPropertyKey', () => {
    
    it('should able handle symbol', () => {
      const key = ToPropertyKey(Symbol.for('test'));
      expect(key).toEqual(Symbol.for('test'));
    });
    
    it('should convert number to string', () => {
      const key = ToPropertyKey(100);
      expect(key).toEqual('100');
    });
    
  });
  
  describe('GetPrototypeArray' , ()=> {
  
    it('for instance', () => {
    
      class A {
      }
    
      class B extends A {
      }
    
      class C extends B {
      }
    
      const c = new C();
    
      const array = GetPrototypeArray(c);
    
      expect(array.length).toEqual(4);
    
      expect(array[0]).toEqual(C.prototype);
      expect(array[1]).toEqual(B.prototype);
      expect(array[2]).toEqual(A.prototype);
      expect(array[3]).toEqual(Object.prototype);
    
    });
    
    it('for class', () => {
    
      class X {
      }
    
      class Y extends X {
      }
    
      class Z extends Y {
      }
    
      const array = GetPrototypeArray(Z);
    
      expect(array.length).toEqual(4);
    
      expect(array[0]).toEqual(Z.prototype);
      expect(array[1]).toEqual(Y.prototype);
      expect(array[2]).toEqual(Z.prototype);
      expect(array[3]).toEqual(Object.prototype);
    
      
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
