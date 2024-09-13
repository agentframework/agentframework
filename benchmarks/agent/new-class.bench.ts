import { bench, describe } from 'vitest';

class A {}

class B extends A {}

const C = eval('(class C extends A {})');

const D = Function('A', 'return class D extends A {}')(A);

const E = new Function()
Reflect.setPrototypeOf(E, A);
Reflect.setPrototypeOf(E.prototype, A.prototype);

describe('new-class', () => {

  bench('func', () => {
    new D()
  });

  bench('prototype', () => {
    new E()
  });

  bench('native', () => {
    new B()
  });

  // bench('eval', () => {
  //   new C()
  // });


});
