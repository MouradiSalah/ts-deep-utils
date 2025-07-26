# Contributing to ts-deep-utils

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to ts-deep-utils. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find that you don't need to create one. When you are creating a bug report, please include as many details as possible using our bug report template.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please use our feature request template and provide the following information:

- Use a clear and descriptive title
- Provide a step-by-step description of the suggested enhancement
- Provide specific examples to demonstrate the steps

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Process

### Prerequisites

- Node.js 16+
- npm

### Setup

```bash
git clone https://github.com/MouradiSalah/ts-deep-utils.git
cd ts-deep-utils
npm install
```

### Running Tests

```bash
npm test           # Run tests once
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Code Style

We use ESLint and Prettier to maintain code quality:

```bash
npm run lint      # Check for linting errors
npm run lint:fix  # Fix linting errors
npm run format    # Format code with Prettier
```

### Building

```bash
npm run build     # Build the project
npm run clean     # Clean build artifacts
```

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### TypeScript Styleguide

- Use TypeScript strict mode
- Prefer interfaces over type aliases for object types
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Use `const` for immutable values
- Prefer arrow functions for callbacks

### Documentation Styleguide

- Use Markdown
- Include code examples for new features
- Update README.md for any API changes
- Keep examples simple and focused

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
