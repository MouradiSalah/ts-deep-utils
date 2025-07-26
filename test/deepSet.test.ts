import { deepGet, deepSet } from '../src';

describe('deepSet', () => {
  it('should set nested value by path', () => {
    const obj = { a: { b: {} } };
    deepSet<typeof obj>(obj, 'a.b.c', 99);
    expect(deepGet<typeof obj>(obj, 'a.b.c')).toBe(99);
  });
});
