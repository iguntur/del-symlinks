# del-symlinks [![Build Status](https://travis-ci.org/iguntur/del-symlinks.svg?branch=master)](https://travis-ci.org/iguntur/del-symlinks) [![npm](https://img.shields.io/npm/v/del-symlinks.svg?style=flat-square)](https://npmjs.com/package/del-symlinks) [![npm](https://img.shields.io/npm/l/del-symlinks.svg?style=flat-square)](#)

> Delete symlinks using [glob](https://github.com/isaacs/minimatch#usage).


## Install

```
$ npm install --save del-symlinks
```


## Usage

**async**

``` js
const delSymlinks = require('del-symlinks');

delSymlinks(['/home/guntur/.*', '!/home/guntur/.*rc']).then(symlinks => {
	console.log('symlinks was deleted:\n', symlinks.join('\n'));
});
```


**sync**

```js
const delSymlinks = require('del-symlinks');

const symlinks = delSymlinks.sync(['/home/guntur/*']);

console.log('Symlinks was deleted:\n', symlinks.join('\n'));
```

## API

### delSymlinks(patterns, [options])

Returns a promise for an array of deleted symlinks paths.

### delSymlinks.sync(patterns, [options])

Returns an array of deleted symlinks paths.

- #### patterns
	Type: `string`, `array`

	See supported minimatch [patterns](https://github.com/isaacs/minimatch#usage).

	- [Pattern examples with expected matches](https://github.com/sindresorhus/multimatch/blob/master/test.js)
	- [Quick globbing pattern overview](https://github.com/sindresorhus/multimatch#globbing-patterns)

- #### options
	Type: `object`

	See the `node-glob` [options](https://github.com/isaacs/node-glob#options).

	**dryRun**

	Type: `boolean`<br>
	Default: `false`

	See symlinks what would be deleted
	```js
	delSymlinks(['/home/guntur/*', '/home/guntur/.*'], { dryRun: true }).then(symlinks => {
		console.log('Symlinks that would be deleted:\n', symlinks.join('\n'));
	});
	```


## License

MIT © [Guntur Poetra](http://guntur.starmediateknik.com)
