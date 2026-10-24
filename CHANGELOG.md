# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][]

### Breaking Changes

- Package files moved: `dist/index.mjs` (ESM), `dist/index.js` (CJS) and `dist/umd/*`. Deep imports from `dist/cjs`, `dist/esm` and `dist/es2015` no longer work; the package entry point is defined via `exports`
- UMD build targets ES2018 (Internet Explorer is no longer supported)
- Requiring Node.js >= 18

### Fixed

- UMD build required a global `tslib` (`window.tslib`), so `set()` threw a `TypeError` when loaded via `<script>`. It's self-contained now
- ESM build was not reachable from Node.js, since the package had no `exports`
- Published package included non-runtime files (`greenkeeper.json`, `contributing.md`, gzip files)
- README described a `NODE_ENV` check for `debug` that doesn't exist

### Updated

- Zero runtime dependencies (`tslib` removed)
- Building ESM, CJS and UMD with tsdown, with per-condition type declarations
- Migrating from Jest to Vitest + Vite
- Migrating to ESLint 9 flat config, typescript-eslint 8, Prettier 3 and TypeScript 6
- Migrating from Circle CI to Github Actions, testing Node 22/24
- Adding package checks: `lint:package` (publint + arethetypeswrong), `size` (size-limit) and `test:smoke` (ESM, CJS and UMD)
- Removing yarn instructions, perf-marks leftovers, Greenkeeper, Coveralls config, bundlesize, husky and lint-staged
- Updating `.nvmrc` to Node.js 24

### Security

- Removing `.coveralls.yml`, which contained the Coveralls repo token

## [7.0.1][] - 2025-08-08

### Fixed

- Fixing `settings` output when debugging

## [7.0.0][] - 2025-08-08

### Updated

- Updating project to use NodeJS `v22.14.0`
- Updating data structure to improve performance when feature toggle service receives a dataset greater than 50 items, having read-heavy operations
- Using spread operators instead of `Object.assign()`
- Adding `Object.freeze()` for dataset immutability
- Moving `FeatureToggleServiceConfig` to be an interface 


## [6.1.0][] - 2023-02-28

### Updated

- Upgrading dependencies to the latest versions
- Updating Circle CI pipeline
- Decreasing the bundle size due to typescript update! 🎉

### Added

- Adding `CODEOWNERS` file

## [6.0.0][] - 2020-07-18

### Fixed

- Updating bundle values for `yarn bundlesize` command
- Combining feature flags per package version instead of overriding the previous values

## [5.0.1][] - 2020-05-13

### Fixed

- Fixing UMD bundle

## [5.0.0][] - 2020-05-13

### Updated

- Upgrading devDependencies to the latest version
- Upgrading `tslib` to `v1.12.0`
- Upgrading `nodejs` to `v12.16.2`
- Upgrading `engines` in `package.json` to accept NodeJS versions only greater or equal than `>=12`
- Using Jest as test framework

### Added

- Adding different bundles for package
  - ESM
  - ES2015
  - UMD
  - CJS

## [4.1.1][] - 2019-06-22

### Fixed

- Fixing types to make `debug` param in `isOn` method optional

## [4.1.0][] - 2019-06-22

### Added

- Added debug mode for `isOn` method
- Exporting type for `FeatureToggleServiceConfig`

## [4.0.1][] - 2019-06-22

### Updated

- Updated `package-lock.json` file

### Added

- Added method description for Editor/IDE integration

<img width="701" alt="Added method description for Editor/IDE integration" src="https://user-images.githubusercontent.com/1252570/59961226-53d91480-9518-11e9-8f3f-acbaf952e955.png">

## [4.0.0][] - 2018-10-07

### Added

- Adding `CHANGELOG.md` on repository
- Decreasing bundle size from `333B` to `322B` 🎉

### Updated

- Bumping dependency packages
- Removing commit validation packages
- Removing ghook package

### Removed

- Removing `setConfig()` to use `set()` method instead

[unreleased]: https://github.com/willmendesneto/feature-toggle-service/compare/v4.1.1...HEAD
[4.1.1]: https://github.com/willmendesneto/feature-toggle-service/compare/v4.1.0...v4.1.1
[4.1.0]: https://github.com/willmendesneto/feature-toggle-service/compare/v4.0.1...v4.1.0
[4.0.1]: https://github.com/willmendesneto/feature-toggle-service/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/willmendesneto/feature-toggle-service/tree/v4.0.0
[unreleased]: https://github.com/willmendesneto/feature-toggle-service/compare/v5.0.0...HEAD
[5.0.0]: https://github.com/willmendesneto/feature-toggle-service/tree/v5.0.0
[unreleased]: https://github.com/willmendesneto/feature-toggle-service/compare/v5.0.1...HEAD
[Unreleased]: https://github.com/willmendesneto/feature-toggle-service/compare/v7.0.1...HEAD
[7.0.1]: https://github.com/willmendesneto/feature-toggle-service/compare/v7.0.0...v7.0.1
[7.0.0]: https://github.com/willmendesneto/feature-toggle-service/compare/v6.1.0...v7.0.0
[6.1.0]: https://github.com/willmendesneto/feature-toggle-service/compare/v6.0.0...v6.1.0
[6.0.0]: https://github.com/willmendesneto/feature-toggle-service/tree/v6.0.0
