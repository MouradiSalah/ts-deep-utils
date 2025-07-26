import { deepMerge } from '../src';

describe('deepMerge', () => {
  it('should deeply merge objects', () => {
    const a = { x: 1, y: { z: 2 } };
    const b = { y: { w: 3 } };
    const merged = deepMerge(a, b);
    expect(merged).toEqual({ x: 1, y: { z: 2, w: 3 } });
  });
});
