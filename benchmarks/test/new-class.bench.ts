import { bench, describe } from 'vitest';

class A {}

class B extends A {}

// const C = eval('(class C extends A {})');

const D = Function('A', 'return class D extends A {}')(A);

const E = new Function()
// @ts-ignore
Reflect.setPrototypeOf(E, A);
// @ts-ignore
Reflect.setPrototypeOf(E.prototype, A.prototype);

describe('new-class', () => {

  bench('func', () => {
    // @ts-ignore
    new D()
  });

  bench('prototype', () => {
    // @ts-ignore
    new E()
  });

  bench('native', () => {
    // @ts-ignore
    new B()
  });

  // bench('eval', () => {
  //   new C()
  // });


});
