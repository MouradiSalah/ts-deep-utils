import { deepEqual } from '../src';

describe('deepEqual', () => {
  describe('primitive values', () => {
    it('should return true for identical primitive values', () => {
      expect(deepEqual(1, 1)).toBe(true);
      expect(deepEqual('hello', 'hello')).toBe(true);
      expect(deepEqual(true, true)).toBe(true);
      expect(deepEqual(false, false)).toBe(true);
    });

    it('should return false for different primitive values', () => {
      expect(deepEqual(1, 2)).toBe(false);
      expect(deepEqual('hello', 'world')).toBe(false);
      expect(deepEqual(true, false)).toBe(false);
      expect(deepEqual(1, '1')).toBe(false);
    });

    it('should handle null and undefined correctly', () => {
      expect(deepEqual(null, null)).toBe(true);
      expect(deepEqual(undefined, undefined)).toBe(true);
      expect(deepEqual(null, undefined)).toBe(false);
      expect(deepEqual(null, 0)).toBe(false);
      expect(deepEqual(undefined, '')).toBe(false);
    });

    it('should handle NaN correctly', () => {
      expect(deepEqual(NaN, NaN)).toBe(true);
      expect(deepEqual(NaN, 0)).toBe(false);
      expect(deepEqual(NaN, undefined)).toBe(false);
    });
  });

  describe('objects', () => {
    it('should return true for identical objects', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { a: 1, b: { c: 2 } };
      expect(deepEqual(obj1, obj2)).toBe(true);
    });

    it('should return false for different objects', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { a: 1, b: { c: 3 } };
      expect(deepEqual(obj1, obj2)).toBe(false);
    });

    it('should return true for same object reference', () => {
      const obj = { a: 1, b: { c: 2 } };
      expect(deepEqual(obj, obj)).toBe(true);
    });

    it('should handle empty objects', () => {
      expect(deepEqual({}, {})).toBe(true);
      expect(deepEqual({}, { a: 1 })).toBe(false);
    });

    it('should handle objects with different key counts', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 2, c: 3 };
      expect(deepEqual(obj1, obj2)).toBe(false);
    });

    it('should handle objects with different keys', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, c: 2 };
      expect(deepEqual(obj1, obj2)).toBe(false);
    });

    it('should handle deeply nested objects', () => {
      const obj1 = { a: { b: { c: { d: { e: 1 } } } } };
      const obj2 = { a: { b: { c: { d: { e: 1 } } } } };
      const obj3 = { a: { b: { c: { d: { e: 2 } } } } };
      expect(deepEqual(obj1, obj2)).toBe(true);
      expect(deepEqual(obj1, obj3)).toBe(false);
    });

    it('should handle objects with mixed value types', () => {
      const obj1 = {
        string: 'hello',
        number: 42,
        boolean: true,
        nullValue: null,
        undefinedValue: undefined,
        nested: { prop: 'value' },
      };
      const obj2 = {
        string: 'hello',
        number: 42,
        boolean: true,
        nullValue: null,
        undefinedValue: undefined,
        nested: { prop: 'value' },
      };
      expect(deepEqual(obj1, obj2)).toBe(true);
    });
  });

  describe('arrays', () => {
    it('should return true for identical arrays', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [1, 2, 3];
      expect(deepEqual(arr1, arr2)).toBe(true);
    });

    it('should return false for different arrays', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [1, 2, 4];
      expect(deepEqual(arr1, arr2)).toBe(false);
    });

    it('should return false for arrays with different lengths', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [1, 2, 3, 4];
      expect(deepEqual(arr1, arr2)).toBe(false);
    });

    it('should handle empty arrays', () => {
      expect(deepEqual([], [])).toBe(true);
      expect(deepEqual([], [1])).toBe(false);
    });

    it('should handle nested arrays', () => {
      const arr1 = [1, [2, 3], [4, [5, 6]]];
      const arr2 = [1, [2, 3], [4, [5, 6]]];
      const arr3 = [1, [2, 3], [4, [5, 7]]];
      expect(deepEqual(arr1, arr2)).toBe(true);
      expect(deepEqual(arr1, arr3)).toBe(false);
    });

    it('should handle arrays with objects', () => {
      const arr1 = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ];
      const arr2 = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ];
      const arr3 = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Bob' },
      ];
      expect(deepEqual(arr1, arr2)).toBe(true);
      expect(deepEqual(arr1, arr3)).toBe(false);
    });

    it('should return false when comparing array to object', () => {
      const arr = [1, 2, 3];
      const obj = { 0: 1, 1: 2, 2: 3 };
      expect(deepEqual(arr, obj)).toBe(false);
    });
  });

  describe('complex mixed structures', () => {
    it('should handle objects containing arrays', () => {
      const obj1 = { users: [{ id: 1, tags: ['admin', 'user'] }], count: 1 };
      const obj2 = { users: [{ id: 1, tags: ['admin', 'user'] }], count: 1 };
      const obj3 = { users: [{ id: 1, tags: ['admin', 'guest'] }], count: 1 };
      expect(deepEqual(obj1, obj2)).toBe(true);
      expect(deepEqual(obj1, obj3)).toBe(false);
    });

    it('should handle arrays containing objects', () => {
      const arr1 = [{ nested: { deep: [1, 2, { value: 'test' }] } }];
      const arr2 = [{ nested: { deep: [1, 2, { value: 'test' }] } }];
      const arr3 = [{ nested: { deep: [1, 2, { value: 'different' }] } }];
      expect(deepEqual(arr1, arr2)).toBe(true);
      expect(deepEqual(arr1, arr3)).toBe(false);
    });
  });

  describe('special object types', () => {
    it('should handle Date objects', () => {
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-01-01');
      const date3 = new Date('2023-01-02');
      expect(deepEqual(date1, date2)).toBe(true);
      expect(deepEqual(date1, date3)).toBe(false);
    });

    it('should handle RegExp objects', () => {
      const regex1 = /test/gi;
      const regex2 = /test/gi;
      const regex3 = /test/g;
      expect(deepEqual(regex1, regex2)).toBe(true);
      expect(deepEqual(regex1, regex3)).toBe(false);
    });

    it('should return false for different object types', () => {
      const date = new Date();
      const regex = /test/;
      const obj = { getTime: () => date.getTime() };
      expect(deepEqual(date, obj)).toBe(false);
      expect(deepEqual(regex, obj)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle objects with numeric keys', () => {
      const obj1 = { 0: 'zero', 1: 'one', name: 'test' };
      const obj2 = { 0: 'zero', 1: 'one', name: 'test' };
      const obj3 = { 0: 'zero', 1: 'two', name: 'test' };
      expect(deepEqual(obj1, obj2)).toBe(true);
      expect(deepEqual(obj1, obj3)).toBe(false);
    });

    it('should handle circular references gracefully', () => {
      const obj1: Record<string, unknown> = { prop: 'value' };
      obj1.self = obj1;
      const obj2: Record<string, unknown> = { prop: 'value' };
      obj2.self = obj2;

      // With circular references, objects should be equal if structure is same
      expect(deepEqual(obj1, obj2)).toBe(true);

      // Different circular structures should be false
      const obj3: Record<string, unknown> = { prop: 'different' };
      obj3.self = obj3;
      expect(deepEqual(obj1, obj3)).toBe(false);
    });

    it('should handle functions (should return false unless same reference)', () => {
      const func1 = () => 'test';
      const func2 = () => 'test';
      expect(deepEqual(func1, func1)).toBe(true);
      expect(deepEqual(func1, func2)).toBe(false);
    });

    it('should handle symbols', () => {
      const sym1 = Symbol('test');
      const sym2 = Symbol('test');
      expect(deepEqual(sym1, sym1)).toBe(true);
      expect(deepEqual(sym1, sym2)).toBe(false);
    });

    it('should handle bigint values', () => {
      const big1 = BigInt(123);
      const big2 = BigInt(123);
      const big3 = BigInt(456);
      expect(deepEqual(big1, big2)).toBe(true);
      expect(deepEqual(big1, big3)).toBe(false);
    });
  });

  describe('performance edge cases', () => {
    it('should handle objects with many properties', () => {
      const obj1: Record<string, number> = {};
      const obj2: Record<string, number> = {};
      for (let i = 0; i < 100; i++) {
        obj1[`prop${i}`] = i;
        obj2[`prop${i}`] = i;
      }
      expect(deepEqual(obj1, obj2)).toBe(true);

      obj2.prop99 = 999;
      expect(deepEqual(obj1, obj2)).toBe(false);
    });

    it('should handle deeply nested structures', () => {
      let obj1: Record<string, unknown> = {};
      let obj2: Record<string, unknown> = {};
      let current1 = obj1;
      let current2 = obj2;

      for (let i = 0; i < 50; i++) {
        current1.nested = { value: i };
        current2.nested = { value: i };
        current1 = current1.nested as Record<string, unknown>;
        current2 = current2.nested as Record<string, unknown>;
      }

      expect(deepEqual(obj1, obj2)).toBe(true);
    });
  });
});
