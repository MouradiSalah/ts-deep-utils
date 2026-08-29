import { deepGet, deepSet } from '../src';

describe('deepSet', () => {
  it('should set nested value by path', () => {
    const obj = { a: { b: {} } };
    deepSet<typeof obj>(obj, 'a.b.c', 99);
    expect(deepGet<typeof obj>(obj, 'a.b.c')).toBe(99);
  });
});

describe('deepSet prototype pollution', () => {
  afterEach(() => {
    delete (Object.prototype as Record<string, unknown>).polluted;
  });

  it('should not pollute Object.prototype through __proto__', () => {
    deepSet({} as Record<string, unknown>, '__proto__.polluted', 'yes');
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });

  it('should not pollute Object.prototype through constructor.prototype', () => {
    deepSet({} as Record<string, unknown>, 'constructor.prototype.polluted', 'yes');
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });

  it('should reject an unsafe key at any depth of the path', () => {
    deepSet({ a: {} } as Record<string, unknown>, 'a.constructor.prototype.polluted', 'yes');
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });

  it('should not overwrite built-ins on Object.prototype', () => {
    deepSet({} as Record<string, unknown>, '__proto__.toString', 'not-a-function');
    expect(typeof {}.toString).toBe('function');
  });

  it('should return the object unmodified when the path is rejected', () => {
    const obj = { a: 1 };
    const result = deepSet(obj, '__proto__.polluted', 'yes');
    expect(result).toBe(obj);
    expect(result).toEqual({ a: 1 });
  });

  it('should not traverse inherited properties when building intermediates', () => {
    (Object.prototype as Record<string, unknown>).polluted = { nested: 'inherited' };
    const obj: Record<string, unknown> = {};
    deepSet(obj, 'polluted.nested', 'own');
    expect(obj.polluted).toEqual({ nested: 'own' });
    expect((Object.prototype as Record<string, unknown>).polluted).toEqual({
      nested: 'inherited',
    });
  });
});
