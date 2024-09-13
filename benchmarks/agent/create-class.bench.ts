import { bench, describe } from 'vitest';

class A { }

const B = Function('A', 'return class B extends A {}');

describe('create-class', () => {

  bench('native', () => {
    class B extends A {}
  });

  bench('eval', () => {
    eval('(class B extends A {})')
  });

  bench('func', () => {
    Function('A', 'return class B extends A {}')(A)
  });

  bench('func (cached)', () => {
    B(A);
  });

  bench('prototype', ()=> {
    const B = new Function()
    Reflect.setPrototypeOf(B, A);
    Reflect.setPrototypeOf(B.prototype, A.prototype);
  });

});
