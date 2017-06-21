# Feature Toggle Service

[![npm version](https://badge.fury.io/js/feature-toggle-service.svg)](http://badge.fury.io/js/feature-toggle-service) [![npm downloads](https://img.shields.io/npm/dm/feature-toggle-service.svg)](https://npmjs.org/feature-toggle-service)
[![MIT License](https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square)](LICENSE)

[![Build Status](https://travis-ci.org/willmendesneto/feature-toggle-service.svg?branch=master)](https://travis-ci.org/willmendesneto/feature-toggle-service)
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


## Setup and installation

Make sure that you are using the NodeJS version is the same as `.nvmrc` file version. If you don't have this version please use a version manager such as `nvm` or `n` to manage your local nodejs versions.

> Please make sure that you are using NodeJS version 6.10.2

Assuming that you are using `nvm`, please run the commands inside this folder:

```bash
$ nvm install $(cat .nvmrc); # install required nodejs version
$ nvm use $(cat .nvmrc); # use nodejs version
$ npm install -g yarn@0.23.4
$ yarn install
```

In Windows, please install NodeJS using one of these options:

Via `NVM Windows` package: Dowload via [this link](https://github.com/coreybutler/nvm-windows). After that, run the commands:

```bash
$ nvm install $(cat .nvmrc); # install required nodejs version
$ nvm use $(cat .nvmrc); # use nodejs version
$ npm install -g yarn@0.23.4
$ yarn install
```

Via Chocolatey:

```bash
$ choco install nodejs.install -version 6.10.2
```

## Demo

Try out the [demo](https://github.com/willmendesneto/feature-toggle-service/blob/master/demo/index.html)!


## Run the app

```bash
$ npm start
```


## Run the tests

```bash
$ npm test # run the tests
```


## Run the build

```bash
$ npm run build # run the tests
```

## `FeatureToggleService`

This service exposes a few different methods with which you can interact with feature toggle service.

### `featureToggleService.setConfigurationObject(obj)`

Adds the  feature toggle configuration in your application. This information will be private and checked via `featureToggleService.isOn(key)` and `featureToggleService.isOff(key)` methods.

### `featureToggleService.isOn(key)`

Checks if the feature toggle configuration has the string key value with `true` value.

### `featureToggleService.isOff(key)`

Checks if the feature toggle configuration does not have the string key value with `true` value.


## Author

**Wilson Mendes (willmendesneto)**
+ <https://plus.google.com/+WilsonMendes>
+ <https://twitter.com/willmendesneto>
+ <http://github.com/willmendesneto>
