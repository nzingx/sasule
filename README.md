# sasule

![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-75%25-yellow)
![CI](https://github.com/nzingx/sasule/actions/workflows/test.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue)

**sasule** is a customizable CLI-based key/password generator with hashing and encoding support. Designed for security, development, and automation needs.

---

## Features

- Customizable key length and quantity
- Character set options: letters, numbers, symbols, alphanumeric, or all
- Casing options: lowercase, uppercase, or mixed
- Hashing support: `md5`, `sha256`, `sha512`
- Encoding options: `base64`, `base32`
- Optional prefix for each key
- Automatic logging with 24-hour cleanup
- Unit tested using Jest

---

## Installation

Requires Node.js v18 or later.

```bash
git clone https://github.com/nzingx/sasule.git
cd sasule
npm install
```

---

## Usage

Run directly:

```bash
node bin/index.js
```

Or globally (after `npm link`):

```bash
sasule
```

Example session:

```
API Key Generator CLI
Generated at: 2025-06-04 22:00:00

? Password length? 64
? How many API keys to generate? 4
? Character set? alphanumeric
? Character casing? mixed
? Hashing algorithm(s)? [x] sha256 [x] sha512
? Output encoding? base64
? Custom prefix (optional): dev_

#1 API Key: dev_W3kzX9...
sha256: ...
sha512: ...
base64: ZGV2X1cz...
```

---

## Project Structure

```
sasule/
├── bin/                  # CLI entry point
├── src/
│   └── lib/              # Core modules: generator, hasher, logger
├── test/                 # Unit tests
├── .github/              # GitHub Actions workflows
│   └── workflows/
├── coverage/             # Test coverage reports
├── LICENSE
├── package.json
└── jest.config.js
```

---

## Dependencies

### Runtime:

* [`inquirer`](https://www.npmjs.com/package/inquirer) – Interactive CLI prompts
* [`crypto-js`](https://www.npmjs.com/package/crypto-js) – Hash algorithms
* [`base32.js`](https://www.npmjs.com/package/base32.js) – Base32 encoding

### Development:

* [`jest`](https://jestjs.io/) – Testing framework
* [`commitizen`](https://www.npmjs.com/package/commitizen) – Conventional commits
* [`cz-conventional-changelog`](https://www.npmjs.com/package/cz-conventional-changelog)

---

## Running Tests

```bash
npm test
```

With coverage:

```bash
npm run coverage
```

---

## License

MIT © 2025 [nzingx](https://github.com/nzingx)

---

## Additional Info

* [Report an Issue](https://github.com/nzingx/sasule/issues)
* [Documentation & Homepage](https://github.com/nzingx/sasule#readme)
* [Support via Ko-fi](https://ko-fi.com/nzingx)