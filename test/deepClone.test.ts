import { deepClone } from '../src';

describe('deepClone', () => {
  it('should deeply clone objects', () => {
    const obj = { a: 1, b: { c: 2 } };
    const clone = deepClone<typeof obj>(obj);
    expect(clone).toEqual(obj);
    expect(clone).not.toBe(obj);
  });
});
