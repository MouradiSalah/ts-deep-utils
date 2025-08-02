import { deepKeys } from '../src';

describe('deepKeys', () => {
  describe('default behavior (unique keys only)', () => {
    it('should return all unique keys from a nested object', () => {
      const obj = { a: { b: { c: 42 }, d: 'hello' }, e: { f: true } };
      const keys = deepKeys(obj);
      expect(keys.sort()).toEqual(['a', 'b', 'c', 'd', 'e', 'f'].sort());
    });

    it('should handle empty objects', () => {
      const obj = {};
      const keys = deepKeys(obj);
      expect(keys).toEqual([]);
    });

    it('should handle objects with null values', () => {
      const obj = { a: null, b: { c: 1 } };
      const keys = deepKeys(obj);
      expect(keys.sort()).toEqual(['a', 'b', 'c'].sort());
    });

    it('should handle deeply nested objects', () => {
      const obj = { a: { b: { c: { d: { e: 100 } } } } };
      const keys = deepKeys(obj);
      expect(keys.sort()).toEqual(['a', 'b', 'c', 'd', 'e'].sort());
    });

    it('should handle objects with arrays', () => {
      const obj = { a: [1, 2, 3], b: { c: ['x', 'y'] } };
      const keys = deepKeys(obj);
      expect(keys.sort()).toEqual(['a', 'b', 'c'].sort());
    });

    it('should return unique keys only', () => {
      const obj = { a: { a: 1 }, b: { a: 2 } };
      const keys = deepKeys(obj);
      expect(keys.sort()).toEqual(['a', 'b'].sort());
      expect(keys.filter((k) => k === 'a')).toHaveLength(1);
    });
  });

  describe('paths mode (dot-notation paths)', () => {
    it('should return dot-notation paths when paths option is true', () => {
      const obj = { name: 'John', info: { city: 'NYC', country: 'USA' } };
      const keys = deepKeys(obj, { paths: true });
      expect(keys.sort()).toEqual(['name', 'info', 'info.city', 'info.country'].sort());
    });

    it('should return all paths for deeply nested objects', () => {
      const obj = { a: { b: { c: 1 } } };
      const keys = deepKeys(obj, { paths: true });
      expect(keys.sort()).toEqual(['a', 'a.b', 'a.b.c'].sort());
    });

    it('should handle complex nested structures with paths', () => {
      const obj = {
        user: {
          profile: {
            name: 'John',
            age: 30,
          },
          settings: {
            theme: 'dark',
          },
        },
        data: null,
      };
      const keys = deepKeys(obj, { paths: true });
      expect(keys.sort()).toEqual(
        [
          'user',
          'user.profile',
          'user.profile.name',
          'user.profile.age',
          'user.settings',
          'user.settings.theme',
          'data',
        ].sort()
      );
    });

    it('should handle objects with arrays in paths mode', () => {
      const obj = { a: [1, 2, 3], b: { c: ['x', 'y'] } };
      const keys = deepKeys(obj, { paths: true });
      expect(keys.sort()).toEqual(['a', 'b', 'b.c'].sort());
    });

    it('should handle empty objects in paths mode', () => {
      const obj = {};
      const keys = deepKeys(obj, { paths: true });
      expect(keys).toEqual([]);
    });

    it('should handle duplicate paths correctly', () => {
      const obj = { a: { b: 1 }, c: { b: 2 } };
      const keys = deepKeys(obj, { paths: true });
      expect(keys.sort()).toEqual(['a', 'a.b', 'c', 'c.b'].sort());
    });
  });

  describe('backward compatibility', () => {
    it('should maintain backward compatibility with existing usage', () => {
      const obj = { user: { profile: { name: 'John' } } };
      const keys = deepKeys(obj);
      expect(keys.sort()).toEqual(['user', 'profile', 'name'].sort());
    });

    it('should work with explicit paths: false', () => {
      const obj = { a: { b: { c: 1 } } };
      const keys = deepKeys(obj, { paths: false });
      expect(keys.sort()).toEqual(['a', 'b', 'c'].sort());
    });
  });

  describe('flexible object types', () => {
    it('should handle objects with numeric keys', () => {
      const obj = { 0: { 1: 'value' }, name: 'test' };
      const keys = deepKeys(obj);
      expect(keys.sort()).toEqual(['0', '1', 'name'].sort());
    });

    it('should handle objects with numeric keys in paths mode', () => {
      const obj = { 0: { 1: 'value' }, name: 'test' };
      const keys = deepKeys(obj, { paths: true });
      expect(keys.sort()).toEqual(['0', '0.1', 'name'].sort());
    });

    it('should handle mixed key types', () => {
      const obj = {
        stringKey: {
          0: 'numeric key',
          nestedString: 'value',
        },
        1: {
          anotherString: 'test',
        },
      };
      const keys = deepKeys(obj);
      expect(keys.sort()).toEqual(['stringKey', '0', 'nestedString', '1', 'anotherString'].sort());
    });

    it('should handle Map-like objects', () => {
      const mapLike = Object.create(null);
      mapLike.key1 = { nested: 'value' };
      mapLike.key2 = 'simple';
      const keys = deepKeys(mapLike);
      expect(keys.sort()).toEqual(['key1', 'nested', 'key2'].sort());
    });

    it('should handle class instances with properties', () => {
      class TestClass {
        public prop1 = { nested: 'value' };
        public prop2 = 'simple';
      }
      const instance = new TestClass();
      const keys = deepKeys(instance, { paths: true });
      expect(keys.sort()).toEqual(['prop1', 'prop1.nested', 'prop2'].sort());
    });

    it('should handle non-object inputs gracefully', () => {
      expect(deepKeys(null)).toEqual([]);
      expect(deepKeys(undefined)).toEqual([]);
      expect(deepKeys('string')).toEqual([]);
      expect(deepKeys(123)).toEqual([]);
      expect(deepKeys(true)).toEqual([]);
    });

    it('should handle primitive values in nested structures', () => {
      const obj = {
        string: 'value',
        number: 42,
        boolean: true,
        nullValue: null,
        undefinedValue: undefined,
        nested: {
          moreValues: 'test',
        },
      };
      const keys = deepKeys(obj);
      expect(keys.sort()).toEqual(
        [
          'string',
          'number',
          'boolean',
          'nullValue',
          'undefinedValue',
          'nested',
          'moreValues',
        ].sort()
      );
    });
  });
});
