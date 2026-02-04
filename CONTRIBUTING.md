# Contributing to Fix-OS

Thank you for your interest in contributing to Fix-OS! We welcome contributions from the community.

## Code of Conduct

This project is committed to providing a welcoming and inspiring community for all. We expect all contributors to follow our Code of Conduct.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on GitHub with:
- Clear title and description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment (OS, Node version, etc.)

### Suggesting Features

Have an idea? Open an issue with:
- Clear description of the feature
- Use cases and benefits
- Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit with clear messages: `git commit -m 'Add: description'`
5. Push to the branch: `git push origin feature/your-feature`
6. Open a Pull Request with:
   - Clear title and description
   - Reference to related issues
   - Screenshots/videos for UI changes

## Development Setup

1. Fork and clone the repository
   ```bash
   git clone https://github.com/yourusername/fix-os.git
   cd fix-os
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.env.local` with your API keys
   ```bash
   cp example.env.local .env.local
   # Add your keys
   ```

4. Start development server
   ```bash
   npm run dev
   ```

## Code Style

- Use TypeScript for all code
- Follow the existing code style
- Run `npm run lint:fix` before committing
- Write meaningful commit messages
- Add comments for complex logic

## Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat: Add voice cloning support

- Implement voice synthesis API
- Add voice selection UI
- Handle audio streaming

Closes #123
```

## Testing

- Write tests for new features
- Ensure all tests pass: `npm test`
- Aim for high code coverage on critical paths

## Documentation

- Update README.md for significant changes
- Add JSDoc comments to new functions
- Update API documentation if endpoints change

## Questions?

Feel free to:
- Open a discussion on GitHub
- Comment on related issues
- Reach out to maintainers

Thank you for helping make Fix-OS better! 🚀
