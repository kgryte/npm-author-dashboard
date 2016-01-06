Author Dashboard
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> NPM author dashboard.


## Installation

``` bash
$ npm install npm-author-dashboard
```


## Usage

``` javascript
var foo = require( 'npm-author-dashboard' );
```

#### foo()

What does `foo` do?

``` javascript
foo()
// returns `undefined`
```


## Examples

``` javascript
var foo = require( 'npm-author-dashboard' );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g npm-author-dashboard
```


### Usage

``` bash

```


### Examples

``` bash
$
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/npm-author-dashboard.svg
[npm-url]: https://npmjs.org/package/npm-author-dashboard

[build-image]: http://img.shields.io/travis/kgryte/npm-author-dashboard/master.svg
[build-url]: https://travis-ci.org/kgryte/npm-author-dashboard

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/npm-author-dashboard/master.svg
[coverage-url]: https://codecov.io/github/kgryte/npm-author-dashboard?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/npm-author-dashboard.svg
[dependencies-url]: https://david-dm.org/kgryte/npm-author-dashboard

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/npm-author-dashboard.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/npm-author-dashboard

[github-issues-image]: http://img.shields.io/github/issues/kgryte/npm-author-dashboard.svg
[github-issues-url]: https://github.com/kgryte/npm-author-dashboard/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com
