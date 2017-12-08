import { Reflection } from './reflection';
import { IAttribute } from './attribute';
import { IInterceptor } from './interceptor';
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

  it('IsEqual', () => {

    expect(IsEqual(NaN, NaN)).toBeTruthy();
    expect(IsEqual(0, false)).toBeTruthy();
    expect(IsEqual(function () { console.log(1) }, new function () { })).toBeTruthy();
    expect(IsEqual(new Date(1009394), new Date(1009394))).toBeTruthy();
    expect(IsEqual(new RegExp(`^a$`), new RegExp(`^a$`))).toBeTruthy();
    expect(IsEqual('ppp', 'ppp')).toBeTruthy();
    expect(IsEqual(10.4564562342342424, 10.4564562342342424)).toBeTruthy();

  });


});
