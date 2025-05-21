import { GetMemory, Remember, SetMemory } from './Memory';

describe('Remember', () => {
  it('should compute and store value on first call', () => {
    const target = {};
    const key = 'test';
    const prop = 'foo';
    const compute = vi.fn(() => 42);

    const result = Remember(key, target, prop, compute);

    expect(result).toBe(42);
    expect(compute).toHaveBeenCalledTimes(1);
    expect(GetMemory('test.foo')).toBe(42);
    expect((target as any).foo).toBe(42);
  });

  it('should return cached value on subsequent calls', () => {
    const target = {};
    const key = 'test';
    const prop = 'foo';
    SetMemory('test.foo', 99); // simulate previous computation

    const compute = vi.fn(() => 42); // should not be called

    const result = Remember(key, target, prop, compute);

    expect(result).toBe(99);
    expect(compute).not.toHaveBeenCalled();
    expect((target as any).foo).toBe(99);
  });

  it('should handle symbol keys', () => {
    const target = {};
    const key = 'symbol';
    const prop = Symbol('bar');
    const compute = () => 'value';

    const result = Remember(key, target, prop, compute);

    expect(result).toBe('value');
    expect(GetMemory(`${key}.${String(prop)}`)).toBe('value');
    expect((target as any)[prop]).toBe('value');
  });
});
