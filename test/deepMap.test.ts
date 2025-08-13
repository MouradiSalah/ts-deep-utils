import { deepMap } from '../src';

describe('deepMap', () => {
  describe('primitive values', () => {
    it('should map primitive values in flat objects', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = deepMap(obj, (value) => (typeof value === 'number' ? value * 2 : value));
      expect(result).toEqual({ a: 2, b: 4, c: 6 });
    });

    it('should handle mixed primitive types', () => {
      const obj = {
        num: 42,
        str: 'hello',
        bool: true,
        nullVal: null,
        undefinedVal: undefined,
      };
      const result = deepMap(obj, (value, _key) => {
        if (typeof value === 'string') return value.toUpperCase();
        if (typeof value === 'number') return value * 2;
        return value;
      });
      expect(result).toEqual({
        num: 84,
        str: 'HELLO',
        bool: true,
        nullVal: null,
        undefinedVal: undefined,
      });
    });

    it('should provide key information to callback', () => {
      const obj = { a: 1, b: 2 };
      const result = deepMap(obj, (value, key) => `${String(key)}:${value}`);
      expect(result).toEqual({ a: 'a:1', b: 'b:2' });
    });

    it('should provide path information to callback', () => {
      const obj = { a: 1, b: 2 };
      const result = deepMap(obj, (value, key, path) => `${path}=${value}`);
      expect(result).toEqual({ a: 'a=1', b: 'b=2' });
    });
  });

  describe('nested objects', () => {
    it('should map values in nested objects', () => {
      const obj = {
        a: { x: 1, y: 2 },
        b: { z: 3 },
      };
      const result = deepMap(obj, (value) => (typeof value === 'number' ? value * 2 : value));
      expect(result).toEqual({
        a: { x: 2, y: 4 },
        b: { z: 6 },
      });
    });

    it('should handle deeply nested objects', () => {
      const obj = {
        a: {
          b: {
            c: {
              d: 10,
            },
          },
        },
      };
      const result = deepMap(obj, (value) => (typeof value === 'number' ? value + 5 : value));
      expect(result).toEqual({
        a: {
          b: {
            c: {
              d: 15,
            },
          },
        },
      });
    });

    it('should provide correct paths for nested values', () => {
      const obj = {
        user: {
          profile: {
            name: 'John',
          },
        },
      };
      const result = deepMap(obj, (value, key, path) =>
        typeof value === 'string' ? `${path}:${value}` : value
      );
      expect(result).toEqual({
        user: {
          profile: {
            name: 'user.profile.name:John',
          },
        },
      });
    });

    it('should handle mixed nested and primitive values', () => {
      const obj = {
        name: 'root',
        data: {
          count: 5,
          items: {
            first: 'a',
            second: 'b',
          },
        },
        enabled: true,
      };
      const result = deepMap(obj, (value) => {
        if (typeof value === 'string') return value.toUpperCase();
        if (typeof value === 'number') return value * 3;
        return value;
      });
      expect(result).toEqual({
        name: 'ROOT',
        data: {
          count: 15,
          items: {
            first: 'A',
            second: 'B',
          },
        },
        enabled: true,
      });
    });
  });

  describe('arrays', () => {
    it('should map values in arrays', () => {
      const obj = { items: [1, 2, 3] };
      const result = deepMap(obj, (value) => (typeof value === 'number' ? value * 2 : value));
      expect(result).toEqual({ items: [2, 4, 6] });
    });

    it('should handle arrays of objects', () => {
      const obj = {
        users: [
          { id: 1, name: 'john' },
          { id: 2, name: 'jane' },
        ],
      };
      const result = deepMap(obj, (value) =>
        typeof value === 'string' ? value.toUpperCase() : value
      );
      expect(result).toEqual({
        users: [
          { id: 1, name: 'JOHN' },
          { id: 2, name: 'JANE' },
        ],
      });
    });

    it('should handle nested arrays', () => {
      const obj = {
        matrix: [
          [1, 2],
          [3, 4],
        ],
      };
      const result = deepMap(obj, (value) => (typeof value === 'number' ? value * 10 : value));
      expect(result).toEqual({
        matrix: [
          [10, 20],
          [30, 40],
        ],
      });
    });

    it('should provide correct paths for array elements', () => {
      const obj = { items: ['a', 'b'] };
      const result = deepMap(obj, (value, key, path) =>
        typeof value === 'string' ? `${path}:${value}` : value
      );
      expect(result).toEqual({ items: ['items.0:a', 'items.1:b'] });
    });

    it('should handle complex array structures', () => {
      const obj = {
        data: [
          { name: 'item1', values: [1, 2] },
          { name: 'item2', values: [3, 4] },
        ],
      };
      const result = deepMap(obj, (value) => {
        if (typeof value === 'string') return value.toUpperCase();
        if (typeof value === 'number') return value * 2;
        return value;
      });
      expect(result).toEqual({
        data: [
          { name: 'ITEM1', values: [2, 4] },
          { name: 'ITEM2', values: [6, 8] },
        ],
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty objects', () => {
      const obj = {};
      const result = deepMap(obj, (value) => value);
      expect(result).toEqual({});
    });

    it('should handle empty arrays', () => {
      const obj = { items: [] };
      const result = deepMap(obj, (value) => value);
      expect(result).toEqual({ items: [] });
    });

    it('should handle null values', () => {
      const obj = { a: null, b: { c: null } };
      const result = deepMap(obj, (value) => (value === null ? 'NULL' : value));
      expect(result).toEqual({ a: 'NULL', b: { c: 'NULL' } });
    });

    it('should handle undefined values', () => {
      const obj = { a: undefined, b: { c: undefined } };
      const result = deepMap(obj, (value) => (value === undefined ? 'UNDEFINED' : value));
      expect(result).toEqual({ a: 'UNDEFINED', b: { c: 'UNDEFINED' } });
    });

    it('should handle functions', () => {
      const fn = () => 'test';
      const obj = { func: fn, data: { callback: fn } };
      const result = deepMap(obj, (value) => (typeof value === 'function' ? 'FUNCTION' : value));
      expect(result).toEqual({ func: 'FUNCTION', data: { callback: 'FUNCTION' } });
    });

    it('should handle Date objects', () => {
      const date = new Date('2023-01-01');
      const obj = { created: date, meta: { updated: date } };
      const result = deepMap(obj, (value) => (value instanceof Date ? value.getFullYear() : value));
      expect(result).toEqual({ created: 2023, meta: { updated: 2023 } });
    });

    it('should handle numeric keys', () => {
      const obj = { 0: 'zero', 1: { 2: 'two' } };
      const result = deepMap(obj, (value) =>
        typeof value === 'string' ? value.toUpperCase() : value
      );
      expect(result).toEqual({ 0: 'ZERO', 1: { 2: 'TWO' } });
    });

    it('should handle symbols as keys', () => {
      const sym1 = Symbol('test1');
      const sym2 = Symbol('test2');
      const obj = { [sym1]: 'value1', nested: { [sym2]: 'value2' } };
      const result = deepMap(obj, (value) =>
        typeof value === 'string' ? value.toUpperCase() : value
      );
      expect(result).toEqual({ [sym1]: 'VALUE1', nested: { [sym2]: 'VALUE2' } });
    });
  });

  describe('non-object inputs', () => {
    it('should handle primitive input values', () => {
      expect(deepMap(42, (value) => value)).toBe(42);
      expect(
        deepMap('hello', (value) => (typeof value === 'string' ? value.toUpperCase() : value))
      ).toBe('HELLO');
      expect(deepMap(true, (value) => !value)).toBe(false);
    });

    it('should handle null input', () => {
      const result = deepMap(null, (value) => (value === null ? 'NULL' : value));
      expect(result).toBe('NULL');
    });

    it('should handle undefined input', () => {
      const result = deepMap(undefined, (value) => (value === undefined ? 'UNDEFINED' : value));
      expect(result).toBe('UNDEFINED');
    });

    it('should handle array input', () => {
      const arr = [1, { a: 2 }, [3, 4]];
      const result = deepMap(arr, (value) => (typeof value === 'number' ? value * 2 : value));
      expect(result).toEqual([2, { a: 4 }, [6, 8]]);
    });
  });

  describe('callback context', () => {
    it('should provide correct key and path information', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
          d: {
            e: 3,
          },
        },
      };
      const calls: Array<{ value: unknown; key: PropertyKey; path: string }> = [];

      deepMap(obj, (value, key, path) => {
        if (typeof value === 'number') {
          calls.push({ value, key, path });
        }
        return value;
      });

      expect(calls).toEqual([
        { value: 1, key: 'a', path: 'a' },
        { value: 2, key: 'c', path: 'b.c' },
        { value: 3, key: 'e', path: 'b.d.e' },
      ]);
    });

    it('should provide correct paths for array indices', () => {
      const obj = { items: [{ id: 1 }, { id: 2 }] };
      const calls: Array<{ value: unknown; key: PropertyKey; path: string }> = [];

      deepMap(obj, (value, key, path) => {
        if (typeof value === 'number') {
          calls.push({ value, key, path });
        }
        return value;
      });

      expect(calls).toEqual([
        { value: 1, key: 'id', path: 'items.0.id' },
        { value: 2, key: 'id', path: 'items.1.id' },
      ]);
    });
  });

  describe('performance and complex structures', () => {
    it('should handle large nested structures', () => {
      const obj: Record<string, unknown> = {};
      for (let i = 0; i < 100; i++) {
        obj[`key${i}`] = { value: i, nested: { deep: i * 2 } };
      }

      const result = deepMap(obj, (value) => (typeof value === 'number' ? value + 1 : value));

      expect(result.key0).toEqual({ value: 1, nested: { deep: 1 } });
      expect(result.key99).toEqual({ value: 100, nested: { deep: 199 } });
    });

    it('should preserve object structure exactly', () => {
      const obj = {
        a: 1,
        b: [2, { c: 3 }],
        d: { e: { f: [4, 5] } },
      };

      const result = deepMap(obj, (value) => value);

      expect(result).toEqual(obj);
      expect(result).not.toBe(obj); // Should be a new object
      expect(result.b).not.toBe(obj.b); // Should be a new array
      expect(result.d).not.toBe(obj.d); // Should be new nested objects
    });
  });
});
