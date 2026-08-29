import { deepDelete } from '../src';
describe('deepDelete', () => {
  it('should delete a property at the specified path', () => {
    const obj = { a: 1, b: { c: { e: 2, f: 3 }, d: 4 } };
    const result = deepDelete(obj, 'b.c.f');
    const expected = { a: 1, b: { c: { e: 2 }, d: 4 } };
    expect(result).toEqual(expected);
  });

  it('should return the original object if the path does not exist', () => {
    const obj = { a: 1, b: { c: 2 } };
    const result = deepDelete(obj, 'b.x');
    expect(result).toEqual(obj);
  });

  it('should handle nested properties', () => {
    const obj = { a: { b: { c: { d: 4 } } } };
    const result = deepDelete(obj, 'a.b.c.d');
    expect(result).toEqual({ a: { b: { c: {} } } });
  });

  it('should return the original object if the path is empty', () => {
    const obj = { a: 1, b: 2 };
    const result = deepDelete(obj, '');
    expect(result).toEqual(obj);
  });

  it('should delete properties from arrays', () => {
    const obj = { arr: [{ id: 1 }, { id: 2 }] };
    const result = deepDelete(obj, 'arr.0.id');
    expect(result).toEqual({ arr: [{}, { id: 2 }] });
  });
});

describe('deepDelete prototype pollution', () => {
  afterEach(() => {
    delete (Object.prototype as Record<string, unknown>).canary;
  });

  it('should not delete properties from Object.prototype through __proto__', () => {
    (Object.prototype as Record<string, unknown>).canary = 'present';
    deepDelete({} as Record<string, unknown>, '__proto__.canary');
    expect((Object.prototype as Record<string, unknown>).canary).toBe('present');
  });

  it('should not delete properties from Object.prototype through constructor.prototype', () => {
    (Object.prototype as Record<string, unknown>).canary = 'present';
    deepDelete({} as Record<string, unknown>, 'constructor.prototype.canary');
    expect((Object.prototype as Record<string, unknown>).canary).toBe('present');
  });

  it('should return the object unmodified when the path is rejected', () => {
    const obj = { a: 1 };
    const result = deepDelete(obj, '__proto__.canary');
    expect(result).toBe(obj);
    expect(result).toEqual({ a: 1 });
  });

  it('should not delete inherited properties reached by a safe path', () => {
    (Object.prototype as Record<string, unknown>).canary = 'present';
    deepDelete({} as Record<string, unknown>, 'canary');
    expect((Object.prototype as Record<string, unknown>).canary).toBe('present');
  });
});
