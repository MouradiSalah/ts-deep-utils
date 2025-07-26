import { deepGet } from '../src';

describe('deepGet', () => {
  it('should get nested value by path', () => {
    const obj = { a: { b: { c: 42 } } };
    expect(deepGet(obj, 'a.b.c')).toBe(42);
  });
});
