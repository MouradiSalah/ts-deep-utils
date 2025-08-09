import { deepHas } from '../src';

describe('deepHas', () => {
  describe('basic functionality', () => {
    it('should return true for existing nested properties', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(deepHas(obj, 'a.b.c')).toBe(true);
    });

    it('should return false for non-existing nested properties', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(deepHas(obj, 'a.b.x')).toBe(false);
    });

    it('should return true for top-level properties', () => {
      const obj = { a: 1, b: 2 };
      expect(deepHas(obj, 'a')).toBe(true);
      expect(deepHas(obj, 'b')).toBe(true);
    });

    it('should return false for non-existing top-level properties', () => {
      const obj = { a: 1, b: 2 };
      expect(deepHas(obj, 'c')).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should return false for non-object values', () => {
      const obj = { a: 42 };
      expect(deepHas(obj, 'a.b.c')).toBe(false);
    });

    it('should return false for empty objects', () => {
      const obj = {};
      expect(deepHas(obj, 'a.b.c')).toBe(false);
    });

    it('should handle null and undefined values correctly', () => {
      const obj = { a: { b: null, c: undefined, d: { e: 1 } } };
      expect(deepHas(obj, 'a.b')).toBe(true); // null is a valid value
      expect(deepHas(obj, 'a.c')).toBe(true); // undefined is a valid value
      expect(deepHas(obj, 'a.b.x')).toBe(false); // can't access properties of null
      expect(deepHas(obj, 'a.c.x')).toBe(false); // can't access properties of undefined
      expect(deepHas(obj, 'a.d.e')).toBe(true);
    });

    it('should handle arrays correctly', () => {
      const obj = { arr: [{ id: 1 }, { id: 2 }], nested: { items: ['a', 'b'] } };
      expect(deepHas(obj, 'arr')).toBe(true);
      expect(deepHas(obj, 'arr.0')).toBe(true);
      expect(deepHas(obj, 'arr.0.id')).toBe(true);
      expect(deepHas(obj, 'arr.2')).toBe(false);
      expect(deepHas(obj, 'nested.items')).toBe(true);
      expect(deepHas(obj, 'nested.items.0')).toBe(true);
    });

    it('should handle empty string paths', () => {
      const obj = { a: 1 };
      expect(deepHas(obj, '')).toBe(false);
    });

    it('should handle invalid path types', () => {
      const obj = { a: 1 };
      expect(deepHas(obj, null as unknown as string)).toBe(false);
      expect(deepHas(obj, undefined as unknown as string)).toBe(false);
      expect(deepHas(obj, 123 as unknown as string)).toBe(false);
    });

    it('should handle non-object inputs', () => {
      expect(deepHas(null, 'a.b')).toBe(false);
      expect(deepHas(undefined, 'a.b')).toBe(false);
      expect(deepHas('string', 'a.b')).toBe(false);
      expect(deepHas(123, 'a.b')).toBe(false);
      expect(deepHas(true, 'a.b')).toBe(false);
      expect(deepHas([], 'a.b')).toBe(false);
    });
  });

  describe('complex nested structures', () => {
    it('should handle deeply nested objects', () => {
      const obj = { a: { b: { c: { d: { e: { f: 'deep' } } } } } };
      expect(deepHas(obj, 'a.b.c.d.e.f')).toBe(true);
      expect(deepHas(obj, 'a.b.c.d.e.g')).toBe(false);
    });

    it('should handle mixed data types', () => {
      const obj = {
        string: 'value',
        number: 42,
        boolean: true,
        nullValue: null,
        undefinedValue: undefined,
        nested: {
          array: [1, 2, { prop: 'test' }],
          object: { deep: { value: 'found' } },
        },
      };

      expect(deepHas(obj, 'string')).toBe(true);
      expect(deepHas(obj, 'number')).toBe(true);
      expect(deepHas(obj, 'boolean')).toBe(true);
      expect(deepHas(obj, 'nullValue')).toBe(true);
      expect(deepHas(obj, 'undefinedValue')).toBe(true);
      expect(deepHas(obj, 'nested.array')).toBe(true);
      expect(deepHas(obj, 'nested.array.2')).toBe(true);
      expect(deepHas(obj, 'nested.array.2.prop')).toBe(true);
      expect(deepHas(obj, 'nested.object.deep.value')).toBe(true);
      expect(deepHas(obj, 'nonexistent')).toBe(false);
    });

    it('should handle objects with numeric keys', () => {
      const obj = { 0: { 1: { 2: 'numeric' } }, name: 'test' };
      expect(deepHas(obj, '0')).toBe(true);
      expect(deepHas(obj, '0.1')).toBe(true);
      expect(deepHas(obj, '0.1.2')).toBe(true);
      expect(deepHas(obj, 'name')).toBe(true);
      expect(deepHas(obj, '0.1.3')).toBe(false);
    });

    it('should handle class instances', () => {
      class TestClass {
        public prop1 = { nested: 'value' };
        public prop2 = 'simple';
      }
      const instance = new TestClass();
      expect(deepHas(instance, 'prop1')).toBe(true);
      expect(deepHas(instance, 'prop1.nested')).toBe(true);
      expect(deepHas(instance, 'prop2')).toBe(true);
      expect(deepHas(instance, 'prop3')).toBe(false);
    });
  });

  describe('edge cases with special values', () => {
    it('should handle objects with falsy values', () => {
      const obj = {
        zero: 0,
        emptyString: '',
        falseValue: false,
        nested: { zero: 0, empty: '' },
      };
      expect(deepHas(obj, 'zero')).toBe(true);
      expect(deepHas(obj, 'emptyString')).toBe(true);
      expect(deepHas(obj, 'falseValue')).toBe(true);
      expect(deepHas(obj, 'nested.zero')).toBe(true);
      expect(deepHas(obj, 'nested.empty')).toBe(true);
    });

    it('should handle prototype pollution attempts', () => {
      const obj = { normal: 'value' };
      expect(deepHas(obj, '__proto__')).toBe(false);
      expect(deepHas(obj, 'constructor')).toBe(false);
      expect(deepHas(obj, 'prototype')).toBe(false);
    });
  });
});
