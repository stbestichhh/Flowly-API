[![Node.js CI](https://github.com/stbestichhh/flowly-api/actions/workflows/node.js.yml/badge.svg)](https://github.com/stbestichhh/flowly-api/actions/workflows/node.js.yml)
[![e2e tests CI](https://github.com/stbestichhh/flowly-api/actions/workflows/e2e.test.js.yml/badge.svg)](https://github.com/stbestichhh/flowly-api/actions/workflows/e2e.test.js.yml)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)


# Flowly API

## Table of contents

* [Description](#about)
* [Getting started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Deployment](#deployment)
  * [Usage](#usage)
  * [Running tests](#running-tests)
* [Contributing](#contributing)
* [Changelog](#changelog)
* [Authors](#authors)
* [License](#license)

## About

Flowly API - backend for project managing service. Developed with NestJS using PostgreSQL database.

## Getting started

### Prerequisites

* yarn `npm i -g yarn` or `corepack enable`

> [!IMPORTANT]
> **Node.js 18.x+** version must be installed in your OS.

### Installation

1. Clone the repository

```shell
$ git clone https://github.com/stbestichhh/flowly-api.git
```

2. Install dependencies

```shell
$ yarn install
```

### Deployment

#### Start the server to production

  ```shell
  $ yarn build
  $ yarn start:prod auth
  $ yarn start:prod flowly
  $ yarn start:prod notifications
  ```

#### Start server locally

  ```shell
  $ yarn start:dev auth
  $ yarn start:dev flowly
  $ yarn start:dev notifications
  ```

### Usage

See API docs by visiting `http://localhost:<service_port>/api/docs`

### Running tests

#### Unit tests

```shell
$ yarn test
```

watch mode

```shell
$ yarn test:watch
```

#### End to end tests

This e2e tests are testing server api

```shell
$ yarn test:e2e
```

watch mode

```shell
$ yarn test:e2e:watch
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Changelog

Project changes are writen in changelog, see the [CHANGELOG.md](CHANGELOG.md).

We use [SemVer](https://semver.org/) for versioning.
For the versions available, see the [tags](https://github.com/stbestichhh/flowly-api/tags) on this repository.

For the supported and unsupported versions, see the [SECURITY.md](SECURITY.md).

## Authors

- [@stbestichhh](https://www.github.com/stbestichhh)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE)