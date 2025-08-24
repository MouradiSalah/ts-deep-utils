import { deepPick } from '../src';

describe('deepPick', () => {
  describe('basic functionality', () => {
    it('should pick specified top-level properties', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = deepPick(obj, ['a', 'c']);
      expect(result).toEqual({ a: 1, c: 3 });
    });

    it('should pick nested properties using dot notation', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
          d: 3,
        },
        e: 4,
      };
      const result = deepPick(obj, ['a', 'b.c']);
      expect(result).toEqual({
        a: 1,
        b: { c: 2 },
      });
    });

    it('should pick multiple nested properties from same parent', () => {
      const obj = {
        a: 1,
        b: 2,
        c: {
          d: 3,
          e: 4,
          f: 5,
        },
      };
      const result = deepPick(obj, ['a', 'c.d', 'c.e']);
      expect(result).toEqual({
        a: 1,
        c: {
          d: 3,
          e: 4,
        },
      });
    });

    it('should handle deeply nested properties', () => {
      const obj = {
        level1: {
          level2: {
            level3: {
              level4: {
                value: 'deep',
              },
            },
            other: 'value',
          },
        },
        shallow: 'prop',
      };
      const result = deepPick(obj, ['level1.level2.level3.level4.value', 'shallow']);
      expect(result).toEqual({
        level1: {
          level2: {
            level3: {
              level4: {
                value: 'deep',
              },
            },
          },
        },
        shallow: 'prop',
      });
    });
  });

  describe('complex data types', () => {
    it('should handle arrays as values', () => {
      const obj = {
        users: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
        ],
        settings: {
          preferences: ['email', 'sms'],
        },
      };
      const result = deepPick(obj, ['users', 'settings.preferences']);
      expect(result).toEqual({
        users: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
        ],
        settings: {
          preferences: ['email', 'sms'],
        },
      });
    });

    it('should handle null and undefined values', () => {
      const obj = {
        nullValue: null,
        undefinedValue: undefined,
        nested: {
          nullProp: null,
          validProp: 'value',
        },
      };
      const result = deepPick(obj, [
        'nullValue',
        'undefinedValue',
        'nested.nullProp',
        'nested.validProp',
      ]);
      expect(result).toEqual({
        nullValue: null,
        undefinedValue: undefined,
        nested: {
          nullProp: null,
          validProp: 'value',
        },
      });
    });

    it('should handle Date objects and other special types', () => {
      const date = new Date('2023-01-01');
      const regex = /test/g;
      const obj = {
        created: date,
        pattern: regex,
        nested: {
          updated: date,
        },
      };
      const result = deepPick(obj, ['created', 'nested.updated']);
      expect(result).toEqual({
        created: date,
        nested: {
          updated: date,
        },
      });
    });

    it('should handle functions', () => {
      const fn = () => 'test';
      const obj = {
        callback: fn,
        nested: {
          handler: fn,
        },
      };
      const result = deepPick(obj, ['callback', 'nested.handler']);
      expect(result).toEqual({
        callback: fn,
        nested: {
          handler: fn,
        },
      });
    });

    it('should handle numeric and symbol keys', () => {
      const sym = Symbol('test');
      const obj = {
        0: 'zero',
        1: { nested: 'one' },
        [sym]: 'symbol value',
        normal: 'string key',
      };
      const result = deepPick(obj, ['0', '1.nested', 'normal']);
      expect(result).toEqual({
        0: 'zero',
        1: { nested: 'one' },
        normal: 'string key',
      });
    });
  });

  describe('edge cases', () => {
    it('should return empty object for non-existent paths', () => {
      const obj = { a: 1, b: { c: 2 } };
      const result = deepPick(obj, ['x', 'b.y', 'z.w']);
      expect(result).toEqual({});
    });

    it('should handle mixed valid and invalid paths', () => {
      const obj = { a: 1, b: { c: 2 }, d: 3 };
      const result = deepPick(obj, ['a', 'b.x', 'd', 'y.z']);
      expect(result).toEqual({ a: 1, d: 3 });
    });

    it('should handle empty paths array', () => {
      const obj = { a: 1, b: 2 };
      const result = deepPick(obj, []);
      expect(result).toEqual({});
    });

    it('should handle empty string paths', () => {
      const obj = { a: 1, b: 2 };
      const result = deepPick(obj, ['', 'a', '']);
      expect(result).toEqual({ a: 1 });
    });

    it('should handle paths that traverse through null/undefined', () => {
      const obj = {
        a: null,
        b: {
          c: undefined,
        },
      };
      const result = deepPick(obj, ['a.invalid', 'b.c.invalid']);
      expect(result).toEqual({});
    });

    it('should handle paths that traverse through primitives', () => {
      const obj = {
        number: 42,
        string: 'hello',
        boolean: true,
      };
      const result = deepPick(obj, ['number.invalid', 'string.length', 'boolean.invalid']);
      expect(result).toEqual({});
    });

    it('should preserve object structure when picking parent and child paths', () => {
      const obj = {
        parent: {
          child1: 'value1',
          child2: 'value2',
        },
      };
      const result = deepPick(obj, ['parent', 'parent.child1']);
      expect(result).toEqual({
        parent: {
          child1: 'value1',
          child2: 'value2',
        },
      });
    });

    it('should handle overlapping paths correctly', () => {
      const obj = {
        a: {
          b: {
            c: 1,
            d: 2,
          },
          e: 3,
        },
      };
      const result = deepPick(obj, ['a.b.c', 'a.b.d', 'a.e']);
      expect(result).toEqual({
        a: {
          b: {
            c: 1,
            d: 2,
          },
          e: 3,
        },
      });
    });
  });

  describe('input validation', () => {
    it('should handle null input object', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = deepPick(null as any, ['a', 'b']);
      expect(result).toEqual({});
    });

    it('should handle undefined input object', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = deepPick(undefined as any, ['a', 'b']);
      expect(result).toEqual({});
    });

    it('should handle primitive input values', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(deepPick(42 as any, ['toString'])).toEqual({});
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(deepPick('string' as any, ['length'])).toEqual({});
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(deepPick(true as any, ['valueOf'])).toEqual({});
    });

    it('should handle non-array paths parameter', () => {
      const obj = { a: 1, b: 2 };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(deepPick(obj, null as any)).toEqual({});
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(deepPick(obj, undefined as any)).toEqual({});
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(deepPick(obj, 'not-array' as any)).toEqual({});
    });

    it('should handle non-string path elements', () => {
      const obj = { a: 1, b: 2 };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = deepPick(obj, ['a', null as any, undefined as any, 123 as any, 'b']);
      expect(result).toEqual({ a: 1, b: 2 });
    });
  });

  describe('real-world scenarios', () => {
    it('should work with user profile data', () => {
      const user = {
        id: 123,
        username: 'john_doe',
        profile: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          avatar: 'avatar.jpg',
          preferences: {
            theme: 'dark',
            language: 'en',
            notifications: {
              email: true,
              push: false,
            },
          },
        },
        metadata: {
          createdAt: '2023-01-01',
          lastLogin: '2023-06-01',
        },
      };

      const publicProfile = deepPick(user, [
        'id',
        'username',
        'profile.firstName',
        'profile.lastName',
        'profile.avatar',
      ]);

      expect(publicProfile).toEqual({
        id: 123,
        username: 'john_doe',
        profile: {
          firstName: 'John',
          lastName: 'Doe',
          avatar: 'avatar.jpg',
        },
      });
    });

    it('should work with API response data', () => {
      const apiResponse = {
        status: 200,
        data: {
          users: [
            {
              id: 1,
              name: 'User 1',
              details: { role: 'admin', active: true },
            },
            {
              id: 2,
              name: 'User 2',
              details: { role: 'user', active: false },
            },
          ],
          pagination: {
            page: 1,
            limit: 10,
            total: 100,
          },
        },
        meta: {
          timestamp: '2023-06-01T10:00:00Z',
        },
      };

      const summary = deepPick(apiResponse, [
        'status',
        'data.users',
        'data.pagination.total',
        'meta.timestamp',
      ]);

      expect(summary).toEqual({
        status: 200,
        data: {
          users: [
            {
              id: 1,
              name: 'User 1',
              details: { role: 'admin', active: true },
            },
            {
              id: 2,
              name: 'User 2',
              details: { role: 'user', active: false },
            },
          ],
          pagination: {
            total: 100,
          },
        },
        meta: {
          timestamp: '2023-06-01T10:00:00Z',
        },
      });
    });

    it('should handle configuration objects', () => {
      const config = {
        app: {
          name: 'MyApp',
          version: '1.0.0',
          debug: true,
        },
        database: {
          host: 'localhost',
          port: 5432,
          credentials: {
            username: 'admin',
            password: 'secret',
          },
        },
        cache: {
          redis: {
            host: 'redis-server',
            port: 6379,
          },
        },
      };

      const publicConfig = deepPick(config, [
        'app.name',
        'app.version',
        'database.host',
        'database.port',
        'cache.redis.host',
      ]);

      expect(publicConfig).toEqual({
        app: {
          name: 'MyApp',
          version: '1.0.0',
        },
        database: {
          host: 'localhost',
          port: 5432,
        },
        cache: {
          redis: {
            host: 'redis-server',
          },
        },
      });
    });
  });

  describe('performance and type safety', () => {
    it('should maintain reference equality for picked values', () => {
      const sharedObject = { shared: 'value' };
      const obj = {
        a: sharedObject,
        b: {
          c: sharedObject,
        },
      };

      const result = deepPick(obj, ['a', 'b.c']);
      expect(result.a).toBe(sharedObject);
      expect(result.b?.c).toBe(sharedObject);
    });

    it('should work with large objects efficiently', () => {
      const largeObj: Record<string, unknown> = {};
      for (let i = 0; i < 1000; i++) {
        largeObj[`key${i}`] = {
          nested: { value: i },
          data: `value${i}`,
        };
      }

      const result = deepPick(largeObj, ['key0.nested.value', 'key999.data']);
      expect(result).toEqual({
        key0: { nested: { value: 0 } },
        key999: { data: 'value999' },
      });
    });

    it('should not mutate the original object', () => {
      const original = {
        a: 1,
        b: { c: 2, d: 3 },
      };
      const originalCopy = JSON.parse(JSON.stringify(original));

      const result = deepPick(original, ['a', 'b.c']);

      expect(original).toEqual(originalCopy);
      expect(result).not.toBe(original);
      expect(result.b).not.toBe(original.b);
    });
  });
});
