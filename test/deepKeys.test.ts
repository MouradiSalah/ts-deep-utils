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
});
