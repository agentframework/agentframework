import { Reflections } from './reflections';

describe('Reflections', () => {

  it('should be a WeakMap', () => {
    expect(Reflections instanceof WeakMap).toBeTruthy();
  });

});
