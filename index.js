'use strict';
var fs = require('fs');
var path = require('path');
var pify = require('pify');
var Promise = require('pinkie-promise');
var getSymlinks = require('get-symlinks');
var objectAssign = require('object-assign');

/**
 * Promises fs.unlink
 *
 * @type {Function} Promise
 */
var fsunlink = pify(fs.unlink, Promise);

/**
 * async
 *
 * @param  {Array|String} patterns [glob]
 * @param  {Object}       opts
 * @return {Function}     Promise [symlinks paths]
 */
module.exports = function (patterns, opts) {
	opts = objectAssign({}, opts);

	var dryRun = opts.dryRun;
	delete opts.dryRun;

	return getSymlinks(patterns, opts).then(function (paths) {
		return Promise.all(paths.map(function (symlinks) {
			symlinks = path.resolve(opts.cwd || '', symlinks);

			if (dryRun) {
				return Promise.resolve(symlinks);
			}

			return fsunlink(symlinks).then(function () {
				return symlinks;
			});
		}));
	});
};

/**
 * sync
 *
 * @param  {Array|String} patterns [glob]
 * @param  {Object}       opts
 * @return {Array}
 */
module.exports.sync = function (patterns, opts) {
	opts = objectAssign({}, opts);

	var dryRun = opts.dryRun;
	delete opts.dryRun;

	return getSymlinks.sync(patterns, opts).map(function (symlinks) {
		symlinks = path.resolve(opts.cwd || '', symlinks);

		if (!dryRun) {
			fs.unlinkSync(symlinks);
		}

		return symlinks;
	});
};
