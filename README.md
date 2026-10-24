# Feature Toggle Service

[![npm](https://img.shields.io/badge/stackblitz-online-orange.svg)](https://stackblitz.com/edit/feature-toggle-service-playground)

[![npm version](https://badge.fury.io/js/feature-toggle-service.svg)](http://badge.fury.io/js/feature-toggle-service) [![npm downloads](https://img.shields.io/npm/dm/feature-toggle-service.svg)](https://npmjs.org/feature-toggle-service)
[![MIT License](https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square)](LICENSE)

[![Build Status](https://github.com/willmendesneto/feature-toggle-service/actions/workflows/ci.yml/badge.svg)](https://github.com/willmendesneto/feature-toggle-service/actions)
[![Coverage Status](https://coveralls.io/repos/willmendesneto/feature-toggle-service/badge.svg?branch=main)](https://coveralls.io/r/willmendesneto/feature-toggle-service?branch=main)

[![NPM](https://nodei.co/npm/feature-toggle-service.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/feature-toggle-service)
[![NPM](https://nodei.co/npm-dl/feature-toggle-service.png?height=3&months=3)](https://npmjs.org/feature-toggle-service)

The simplest solution for [feature toggles](http://martinfowler.com/bliki/FeatureToggle.html) in Javascript. Simple how it should be.

## Why Feature toggle?

> This is a common concept, but why use this directive instead solve it via server-side rendering?

The idea of this directive is make this process transparent and easier. So the main point is integrate this directive with other tooling process, such as:

- Server-side rendering;
- Progressive rendering;
- Any other that yoy like :)

You can integrate with WebSockets or handling this in a EventSourcing architecture. It's totally transparent for you and you can integrate easier in your application.

## Contributing

Please check our [contributing.md](https://github.com/willmendesneto/feature-toggle-service/blob/main/contributing.md) to know more about setup and how to contribute.

## Install

```bash
npm install feature-toggle-service
```

```js
import { set, isOn } from 'feature-toggle-service';

set({ enableNewHeader: true, enableBetaArea: false });

isOn('enableNewHeader'); // true
isOn('enableBetaArea'); // false
```

### Using it via `<script>` tag (UMD)

The UMD build exposes the `FeatureToggleService` global:

```html
<script src="https://unpkg.com/feature-toggle-service/dist/umd/feature-toggle-service.min.js"></script>
<script>
  FeatureToggleService.set({ enableNewHeader: true });
  FeatureToggleService.isOn('enableNewHeader'); // true
</script>
```

## Demo

Try out our [demo on Stackblitz](https://feature-toggle-service-playground.stackblitz.io)!

## Development

Use the Node.js version from `.nvmrc` (e.g. `nvm use`), then:

```bash
npm install
npm test            # unit tests (Vitest)
npm run test:smoke  # installs the packed package and checks ESM, CJS and UMD builds
npm run lint        # ESLint
npm run format      # Prettier
npm run lint:types  # TypeScript type check
npm run build       # builds ESM, CJS and UMD into `dist/`
npm run size        # bundle size check (size-limit)
```

## `FeatureToggleService`

This service exposes a few different methods with which you can interact with feature toggle service.

### `featureToggleService.set(obj)`

Adds the feature toggle configuration in your application. This information will be private and checked via `featureToggleService.isOn(key)` method.

### `featureToggleService.isOn(key, debug)`

Checks if the feature toggle configuration has the string key value with `true` value. For bundle reasons if you want to check if the feature toggle is turned off, please use `!featureToggleService.isOn(key)`. When `debug` param is passed as `true`, it prints configuration, version and settings for debug purposes

### `createFeatureToggleService(initialConfig)`

Creates an isolated service with its own configuration. Use it when the global configuration shared by `set()`/`isOn()` is not enough, e.g. one service per server request (so toggles don't leak between users) or per React tree.

```js
import { createFeatureToggleService } from 'feature-toggle-service';

const featureToggles = createFeatureToggleService({ enableNewHeader: true });

featureToggles.isOn('enableNewHeader'); // true
featureToggles.set({ enableBetaArea: true }); // merged with the current configuration
featureToggles.getAll(); // { enableNewHeader: true, enableBetaArea: true }

// Notified every time the configuration changes
const unsubscribe = featureToggles.subscribe(() => {
  console.log(featureToggles.getAll());
});
```

`getAll()` returns a frozen object that keeps the same reference until the configuration changes, so `subscribe` and `getAll` can be used with React's `useSyncExternalStore`.

## Publish

this project is using `np` package to publish, which makes things straightforward. EX: `np <patch|minor|major>`

> For more details, [please check np package on npmjs.com](https://www.npmjs.com/package/np)

## Author

**Wilson Mendes (willmendesneto)**

- <https://twitter.com/willmendesneto>
- <http://github.com/willmendesneto>
