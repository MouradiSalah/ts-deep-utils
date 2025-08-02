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

### deepKeys

Extracts all keys from a nested object with flexible output options.

```typescript
import { deepKeys } from 'ts-deep-utils';

const obj = { user: { profile: { name: 'John', age: 30 } } };

// Get unique key names only (default)
const keys = deepKeys(obj);
// Result: ['user', 'profile', 'name', 'age']

// Get dot-notation paths
const paths = deepKeys(obj, { paths: true });
// Result: ['user', 'user.profile', 'user.profile.name', 'user.profile.age']
```

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
