# Feature Toggle Service

[![Greenkeeper badge](https://badges.greenkeeper.io/willmendesneto/feature-toggle-service.svg)](https://greenkeeper.io/)
[![npm](https://img.shields.io/badge/stackblitz-online-orange.svg)](https://stackblitz.com/edit/feature-toggle-service-playground)

[![npm version](https://badge.fury.io/js/feature-toggle-service.svg)](http://badge.fury.io/js/feature-toggle-service) [![npm downloads](https://img.shields.io/npm/dm/feature-toggle-service.svg)](https://npmjs.org/feature-toggle-service)
[![MIT License](https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square)](LICENSE)

[![Build Status](https://circleci.com/gh/willmendesneto/feature-toggle-service.svg?style=shield)](https://circleci.com/gh/willmendesneto/feature-toggle-service)
[![Coverage Status](https://coveralls.io/repos/willmendesneto/feature-toggle-service/badge.svg?branch=master)](https://coveralls.io/r/willmendesneto/feature-toggle-service?branch=master)
[![Dependency Status](https://david-dm.org/willmendesneto/feature-toggle-service.svg)](https://david-dm.org/willmendesneto/feature-toggle-service)

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

Please check our [contributing.md](https://github.com/willmendesneto/feature-toggle-service/blob/master/contributing.md) to know more about setup and how to contribute.

## Setup and installation

Make sure that you are using the NodeJS version is the same as `.nvmrc` file version. If you don't have this version please use a version manager such as `nvm` or `n` to manage your local nodejs versions.

> Please make sure that you are using NodeJS version 6.10.2

Assuming that you are using `nvm`, please run the commands inside this folder:

```bash
$ nvm install $(cat .nvmrc); # install required nodejs version
$ nvm use $(cat .nvmrc); # use nodejs version
```

In Windows, please install NodeJS using one of these options:

Via `NVM Windows` package: Dowload via [this link](https://github.com/coreybutler/nvm-windows). After that, run the commands:

```bash
$ nvm install $(cat .nvmrc); # install required nodejs version
$ nvm use $(cat .nvmrc); # use nodejs version
```

Via Chocolatey:

```bash
$ choco install nodejs.install -version 6.10.2
```

### Install yarn

We use `yarn` as our package manager instead of `npm`

[Install it following these steps](https://yarnpkg.com/lang/en/docs/install/#mac-tab)

After that, just navigate to your local repository and run

```bash
$ yarn install
```

## Demo

Try out our [demo on Stackblitz](https://feature-toggle-service-playground.stackblitz.io)!

### Run the tests

```bash
$ yarn test # run the tests
```

### Run the build

```bash
$ yarn build # run the tests
```

### Run the bundlesize check

```bash
$ yarn bundlesize # run the tests
```

### Run the code lint

```bash
$ yarn lint # run the tests
```

## `FeatureToggleService`

This service exposes a few different methods with which you can interact with feature toggle service.

### `featureToggleService.set(obj)`

Adds the feature toggle configuration in your application. This information will be private and checked via `featureToggleService.isOn(key)` method.

### `featureToggleService.isOn(key, debug)`

Checks if the feature toggle configuration has the string key value with `true` value. For bundle reasons if you want to check if the feature toggle is turned off, please use `!featureToggleService.isOn(key)`. When `debug` param is passed as `true` and it's not `NODE_ENV` is not set to prod, it prints configuration, version and settings for debug purposes

## Publish

this project is using `np` package to publish, which makes things straightforward. EX: `np <patch|minor|major>`

> For more details, [please check np package on npmjs.com](https://www.npmjs.com/package/np)

## Author

**Wilson Mendes (willmendesneto)**

- <https://twitter.com/willmendesneto>
- <http://github.com/willmendesneto>
