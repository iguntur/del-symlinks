# del-symlinks [![Build Status](https://travis-ci.org/iguntur/del-symlinks.svg?branch=master)](https://travis-ci.org/iguntur/del-symlinks)

> Delete symlinks using [glob](https://github.com/isaacs/minimatch#usage).


## Install

``` bash
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

	**&middot; dryRun**

	Type: `boolean`<br>
	Default: `false`

	See symlinks what would be deleted instead of deleting
	```js
	delSymlinks(['/home/guntur/*', '/home/guntur/.*'], { dryRun: true }).then(symlinks => {
		console.log('Symlinks that would be deleted:\n', symlinks.join('\n'));
	});
	```


## Related

- [get-symlinks](https://github.com/iguntur/get-symlinks) - Get all symbolic link in directory
- [is-symbolic-link](https://github.com/iguntur/is-symbolic-link) - Check if PATH is symbolic link


## License

MIT © [Guntur Poetra](http://guntur.starmediateknik.com)
