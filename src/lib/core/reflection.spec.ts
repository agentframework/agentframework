import { Reflection } from './reflection';
import { IAttribute } from './attribute';
import { IInterceptor } from './interceptor';



class Test {
}

class TestAttribute implements IAttribute {
  public beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }
  public getInterceptor(): IInterceptor {
    throw new TypeError('Not Implemented TestAttribute')
  }
}

describe('Reflection', () => {
  
  describe('# should not able to', () => {

    it('get reflection on non-object', () => {
      expect(() => {
        const instance = Reflection.getInstance('Class');
        console.log('[SHOULD_NEVER_SEEM_THIS]', instance);
      }).toThrowError();
    });

    it('get own reflection on non-object', () => {
      expect(() => {
        const instance = Reflection.getOwnInstance('Class');
        console.log('[SHOULD_NEVER_SEEM_THIS]', instance);
      }).toThrowError();
    });
    
  });

  describe('# should able to', () => {

    it('get empty array if non-attribute found', () => {
      expect(Reflection.getAttributes(Test)).toEqual([]);
    });

    it('add attribute multiple times', () => {
      Reflection.addAttribute(new TestAttribute(), Test);
      Reflection.addAttribute(new TestAttribute(), Test);
      const attributes = Reflection.getAttributes(Test);
      expect(attributes.length).toEqual(2);
    });

    it('add get target', () => {
      const reflection = Reflection.getOwnInstance(Test);
      expect(reflection.target).toEqual(Test.prototype);
      expect(reflection.targetKey).toBeUndefined();
    });

  });
  
});
