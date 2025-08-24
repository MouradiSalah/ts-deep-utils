# ts-deep-utils

A TypeScript utility library focused on deep operations for objects and arrays with full type safety. Similar to Lodash, but narrower in scope and fully written in TypeScript to maximize typing support.

## Features

- 🔒 **Full Type Safety**: Written in TypeScript with strict typing
- 🚀 **Zero Dependencies**: Lightweight and fast
- 🧪 **Well Tested**: Comprehensive test coverage
- 📦 **Tree Shakeable**: Import only what you need
- 🔧 **Deep Operations**: Focus on nested object/array manipulation
- 🗑️ **Deep Delete**: Remove nested properties immutably

## Installation

```bash
npm install ts-deep-utils
```

## Usage

### deepClone

Creates a deep copy of an object using JSON serialization.

```typescript
import { deepClone } from 'ts-deep-utils';

const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);
// cloned is a separate object with the same structure
```

### deepMerge

Recursively merges two objects, combining properties from both source and target.

```typescript
import { deepMerge } from 'ts-deep-utils';

const target = { a: 1, b: { x: 1 } };
const source = { b: { y: 2 }, c: 3 };
const result = deepMerge(target, source);
// Result: { a: 1, b: { x: 1, y: 2 }, c: 3 }
```

### deepGet

Safely retrieves a nested property from an object using a dot-separated path.

```typescript
import { deepGet } from 'ts-deep-utils';

const obj = { a: { b: { c: 42 } } };
const value = deepGet(obj, 'a.b.c'); // Returns 42
const missing = deepGet(obj, 'a.b.x'); // Returns undefined
```

### deepSet

Sets a nested property in an object using a dot-separated path.

```typescript
import { deepSet } from 'ts-deep-utils';

const obj = { a: { b: {} } };
deepSet(obj, 'a.b.c', 42);
// obj is now { a: { b: { c: 42 } } }
```

### deepHas

Checks if a nested property exists in an object using a dot-separated path.

```typescript
import { deepHas } from 'ts-deep-utils';

const obj = { a: { b: { c: 42 } } };
const exists = deepHas(obj, 'a.b.c'); // Returns true
const notExists = deepHas(obj, 'a.b.x'); // Returns false

// Works with arrays and mixed data types
const complexObj = { users: [{ id: 1, profile: { name: 'John' } }] };
deepHas(complexObj, 'users.0.profile.name'); // Returns true
```

### deepEqual

Performs deep equality comparison between two values, including objects, arrays, and primitive values.

```typescript
import { deepEqual } from 'ts-deep-utils';

const obj1 = { a: 1, b: { c: [1, 2, 3] } };
const obj2 = { a: 1, b: { c: [1, 2, 3] } };
deepEqual(obj1, obj2); // Returns true

// Works with arrays
const arr1 = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
];
const arr2 = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
];
deepEqual(arr1, arr2); // Returns true

// Handles special cases
deepEqual(NaN, NaN); // Returns true (unlike === comparison)
deepEqual(new Date('2023-01-01'), new Date('2023-01-01')); // Returns true
```

### deepMap

Recursively maps over all values in a nested object structure, applying a transformation function to every value while preserving the object structure.

```typescript
import { deepMap } from 'ts-deep-utils';

const obj = { a: 1, b: { c: 2, d: 3 } };
const doubled = deepMap(obj, (value) => (typeof value === 'number' ? value * 2 : value));
// Result: { a: 2, b: { c: 4, d: 6 } }

// Works with arrays and complex structures
const data = {
  users: [
    { name: 'john', age: 30 },
    { name: 'jane', age: 25 },
  ],
  settings: { theme: 'dark' },
};
const uppercase = deepMap(data, (value) =>
  typeof value === 'string' ? value.toUpperCase() : value
);
// Result: { users: [{ name: 'JOHN', age: 30 }, { name: 'JANE', age: 25 }], settings: { theme: 'DARK' } }

// Callback receives value, key, and full path information
const pathTracker = deepMap(obj, (value, key, path) =>
  typeof value === 'number' ? `${path}: ${value}` : value
);
// Result: { a: 'a: 1', b: { c: 'b.c: 2', d: 'b.d: 3' } }
```

### deepKeys

Extracts all keys from a nested object structure, with options for returning paths or unique key names.

```typescript
import { deepKeys } from 'ts-deep-utils';

const obj = { a: { b: { c: 1 } } };
const keys = deepKeys(obj);
// Result: ['a', 'b', 'c']

const paths = deepKeys(obj, { paths: true });
// Result: ['a', 'a.b', 'a.b.c']
```

### deepPick

Extracts specific properties from a nested object using dot-notation paths.

```typescript
import { deepPick } from 'ts-deep-utils';

const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  profile: { age: 30, city: 'NYC' },
};
const result = deepPick(user, ['id', 'name', 'profile.age']);
// Result: { id: 1, name: 'John', profile: { age: 30 } }
```

### deepDelete

### deepDelete

Deletes a property at a given dot-separated path from an object or array, returning a new object with the property removed. The original object is not mutated.

```typescript
import { deepDelete } from 'ts-deep-utils';

const obj = { a: { b: { c: 1, d: 2 } } };
const result = deepDelete(obj, 'a.b.c');
// result: { a: { b: { d: 2 } } }
```

## API Reference

### `deepClone<T>(obj: T): T`

Creates a deep copy of an object.

**Note**: This method uses JSON serialization and has limitations with functions, undefined, symbols, and circular references.

**Parameters:**

- `obj`: The object to clone

**Returns:** A deep copy of the input object

### `deepMerge<T, U>(target: T, source: U): T & U`

Recursively merges two objects.

**Parameters:**

- `target`: The target object to merge into
- `source`: The source object to merge from

**Returns:** A new object with merged properties

### `deepGet<T>(obj: T, path: string): unknown`

Safely retrieves a nested property from an object.

**Parameters:**

- `obj`: The object to retrieve the value from (must extend Record<string, unknown>)
- `path`: Dot-separated path to the property (e.g., 'a.b.c')

**Returns:** The value at the specified path, or undefined if not found

### `deepSet<T>(obj: T, path: string, value: unknown): T`

Sets a nested property in an object.

**Parameters:**

- `obj`: The object to modify
- `path`: Dot-separated path to the property (e.g., 'a.b.c')
- `value`: The value to set at the specified path

**Returns:** The modified object (same reference as input)

### `deepHas<T>(obj: T, path: string): boolean`

Checks if a nested property exists in an object using a dot-separated path.

**Parameters:**

- `obj`: The object to check for the property
- `path`: Dot-separated path to the property (e.g., 'a.b.c')

**Returns:** True if the property exists, false otherwise

**Examples:**

```typescript
const obj = { a: { b: { c: 42 } } };
deepHas(obj, 'a.b.c'); // Returns true
deepHas(obj, 'a.b.x'); // Returns false

// Works with arrays
const arr = { items: [{ id: 1 }, { id: 2 }] };
deepHas(arr, 'items.0.id'); // Returns true
deepHas(arr, 'items.2'); // Returns false

// Handles null/undefined values correctly
const obj2 = { user: { profile: null } };
deepHas(obj2, 'user.profile'); // Returns true (null is a valid value)
deepHas(obj2, 'user.profile.name'); // Returns false (can't access properties of null)
```

### `deepEqual(obj1: unknown, obj2: unknown): boolean`

Performs deep equality comparison between two values, including objects, arrays, and primitive values.

**Parameters:**

- `obj1`: The first value to compare
- `obj2`: The second value to compare

**Returns:** True if the values are deeply equal, false otherwise

**Features:**

- Handles circular references gracefully
- Compares Date objects by their time values
- Compares RegExp objects by their string representation
- Treats NaN as equal to NaN (unlike strict equality)
- Recursively compares nested objects and arrays
- Type-safe with proper primitive value handling

**Examples:**

```typescript
// Objects
deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }); // Returns true

// Arrays
deepEqual([1, [2, 3]], [1, [2, 3]]); // Returns true

// Special values
deepEqual(NaN, NaN); // Returns true
deepEqual(new Date('2023-01-01'), new Date('2023-01-01')); // Returns true
deepEqual(/abc/g, /abc/g); // Returns true

// Mixed structures
const obj1 = { users: [{ id: 1, active: true }] };
const obj2 = { users: [{ id: 1, active: true }] };
deepEqual(obj1, obj2); // Returns true
```

### `deepMap<T>(obj: T, callback: (value: unknown, key: PropertyKey, path: string) => unknown, currentPath?: string): T`

Recursively maps over all values in a nested object structure, applying a transformation function to every value while preserving the object structure.

**Parameters:**

- `obj`: The object to map over
- `callback`: Function to apply to each value. Receives (value, key, path)
- `currentPath`: Internal parameter for tracking the current path (used in recursion)

**Returns:** A new object with the same structure but transformed values

**Features:**

- Preserves the original object/array structure
- Handles nested objects, arrays, and primitive values
- Provides full path context to the callback function
- Supports special object types (Date, RegExp, functions)
- Maintains type safety with TypeScript generics

**Examples:**

```typescript
// Transform numeric values
const numbers = { a: 1, b: { c: 2, d: [3, 4] } };
const doubled = deepMap(numbers, (value) => (typeof value === 'number' ? value * 2 : value));
// Result: { a: 2, b: { c: 4, d: [6, 8] } }

// Transform strings based on path
const data = { user: { name: 'john' }, title: 'admin' };
const withPaths = deepMap(data, (value, key, path) =>
  typeof value === 'string' ? `${path}:${value.toUpperCase()}` : value
);
// Result: { user: { name: 'user.name:JOHN' }, title: 'title:ADMIN' }

// Handle complex structures
const complex = { items: [{ id: 1, data: { value: 'test' } }] };
const result = deepMap(complex, (value) =>
  typeof value === 'string' ? value.toUpperCase() : value
);
// Result: { items: [{ id: 1, data: { value: 'TEST' } }] }
```

### `deepKeys<T>(obj: T, options?: { paths?: boolean }): string[]`

Extracts all keys from a nested object with flexible output options.

**Parameters:**

- `obj`: The object to extract keys from (must extend Record<string, unknown>)
- `options`: Configuration options
  - `paths`: If true, returns dot-notation paths (e.g., 'a.b.c'). If false, returns only unique key names (default: false)

**Returns:** An array containing keys or paths based on the configuration

**Examples:**

```typescript
const obj = { user: { profile: { name: 'John', age: 30 } } };

// Get unique key names only (default)
deepKeys(obj);
// Result: ['user', 'profile', 'name', 'age']

// Get dot-notation paths
deepKeys(obj, { paths: true });
// Result: ['user', 'user.profile', 'user.profile.name', 'user.profile.age']
```

### `deepPick<T>(obj: T, paths: string[]): Partial<T>`

Extracts specific properties from a nested object using dot-notation paths, creating a new object with only the specified properties while preserving the nested structure.

**Parameters:**

- `obj`: The source object to pick properties from
- `paths`: Array of dot-notation property paths to pick (e.g., ['a', 'b.c', 'd.e.f'])

**Returns:** A new object containing only the specified properties with their nested structure preserved

**Features:**

- Supports nested property extraction using dot notation
- Preserves object structure for picked properties
- Gracefully handles non-existent paths (ignores them)
- Maintains reference equality for picked values
- Type-safe with proper TypeScript support

**Examples:**

```typescript
// Basic property picking
const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  profile: { age: 30, city: 'NYC' }
};
const result = deepPick(user, ['id', 'name', 'profile.age']);
// Result: { id: 1, name: 'John', profile: { age: 30 } }

// Complex nested structures
const data = {
  users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }],
  settings: {
    theme: 'dark',
    notifications: { email: true, push: false }
  },
  metadata: { version: '1.0' }
};
const picked = deepPick(data, ['users', 'settings.theme', 'settings.notifications.email']);
// Result: {
//   users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }],
//   settings: { theme: 'dark', notifications: { email: true } }
// }

// API response filtering
const apiResponse = {
  status: 200,
  data: { users: [...], pagination: { total: 100, page: 1 } },
  meta: { timestamp: '2023-06-01' }
};
const summary = deepPick(apiResponse, ['status', 'data.users', 'data.pagination.total']);
// Result: { status: 200, data: { users: [...], pagination: { total: 100 } } }

// Graceful handling of non-existent paths
deepPick({ a: 1, b: { c: 2 } }, ['a', 'b.c', 'nonexistent.path']);
// Result: { a: 1, b: { c: 2 } } (invalid paths are ignored)
```

### `deepDelete<T>(obj: T, path: string): T`

Deletes a property at the specified dot-separated path from an object or array, returning a new object with the property removed. The original object is not mutated.

**Parameters:**

- `obj`: The object or array to delete from
- `path`: Dot-separated path to the property (e.g., 'a.b.c' or 'arr.0.id')

**Returns:** A new object with the property removed (original is not mutated)

**Examples:**

```typescript
// Remove nested property
deepDelete({ a: { b: { c: 1 } } }, 'a.b.c'); // { a: { b: {} } }

// Remove property from array element
deepDelete({ arr: [{ id: 1 }, { id: 2 }] }, 'arr.0.id'); // { arr: [{}, { id: 2 }] }

// Path does not exist
deepDelete({ a: 1 }, 'b.c'); // { a: 1 }

// Empty path returns original object
deepDelete({ a: 1 }, ''); // { a: 1 }
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build the project
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**MouradiSalah** - [GitHub](https://github.com/MouradiSalah)
