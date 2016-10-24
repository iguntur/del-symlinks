import p from 'path';
import test from 'ava';
import fs from 'fs-extra';
import tempfile from 'tempfile';
import pathExists from 'path-exists';
import fn from './';

const fixtures = ['bar.txt', 'baz.txt', 'foo.txt', '.dot.txt', '.qux.txt', '.untitled.tmp'];

function exist(t, symlinks) {
	[].concat(fixtures).forEach(file => t.true(pathExists.sync(p.join(t.context.files, file))));
	[].concat(symlinks).forEach(file => t.true(pathExists.sync(p.join(t.context.symlinks, file))));
}

function notExist(t, symlinks) {
	[].concat(symlinks).forEach(file => t.false(pathExists.sync(p.join(t.context.symlinks, file))));
}

function expected(t, files) {
	[].concat(files).map(fl => p.join(t.context.symlinks, fl));
}

test.beforeEach(t => {
	t.context.path = tempfile();
	t.context.files = p.join(t.context.path, 'files');
	t.context.symlinks = p.join(t.context.path, 'symlinks');

	fixtures.forEach(fileName => {
		fs.ensureFileSync(p.join(t.context.files, fileName));
		fs.ensureSymlinkSync(p.join(t.context.files, fileName), p.join(t.context.symlinks, fileName));
	});
});

/**
 * async
 */

test('async: remove all symlinks excepts `.*`', async t => {
	const sm = await fn(['**/*'], {cwd: t.context.path});
	const rm = ['bar.txt', 'baz.txt', 'foo.txt'];

	exist(t, ['.dot.txt', '.qux.txt', '.untitled.tmp']);
	notExist(t, rm);
	t.deepEqual(sm, expected(t, rm));
});

test('async: remove symlinks only starting with `.*`', async t => {
	const sm = await fn(['**/.*'], {cwd: t.context.path});
	const rm = ['.dot.txt', '.qux.txt', '.untitled.tmp'];

	notExist(t, rm);
	exist(t, ['bar.txt', 'baz.txt', 'foo.txt']);
	t.deepEqual(sm, expected(t, rm));
});

test('async: remove all symlinks and except `.tmp`', async t => {
	const sm = await fn(['**/*', '**/.*', '!**/.untitled.tmp'], {cwd: t.context.path});
	const rm = ['bar.txt', 'baz.txt', 'foo.txt', '.dot.txt', '.qux.txt'];

	notExist(t, rm);
	exist(t, ['.untitled.tmp']);
	t.deepEqual(sm, expected(t, rm));
});

test('async: remove all symlinks', async t => {
	const sm = await fn(['**/*', '**/.*'], {cwd: t.context.path});

	notExist(t, fixtures);
	t.deepEqual(sm, expected(t, fixtures));
});

test('async: dryRun - show all symlinks and don\'t remove', async t => {
	const sm = await fn(['**/*', '**/.*'], {
		cwd: t.context.path,
		dryRun: true
	});

	exist(t, fixtures);
	t.deepEqual(sm, expected(t, fixtures));
});

/**
 * sync
 */

test('sync: remove all symlinks excepts `.*`', t => {
	const sm = fn.sync(['**/*'], {cwd: t.context.path});
	const rm = ['bar.txt', 'baz.txt', 'foo.txt'];

	exist(t, ['.dot.txt', '.qux.txt', '.untitled.tmp']);
	notExist(t, rm);
	t.deepEqual(sm, expected(t, rm));
});

test('sync: remove symlinks only starting with `.*`', t => {
	const sm = fn.sync(['**/.*'], {cwd: t.context.path});
	const rm = ['.dot.txt', '.qux.txt', '.untitled.tmp'];

	exist(t, ['bar.txt', 'baz.txt', 'foo.txt']);
	notExist(t, rm);
	t.deepEqual(sm, expected(t, rm));
});

test('sync: remove all symlinks and except `.tmp`', t => {
	const sm = fn.sync(['**/*', '**/.*', '!**/.untitled.tmp'], {cwd: t.context.path});
	const rm = ['bar.txt', 'baz.txt', 'foo.txt', '.dot.txt', '.qux.txt'];

	notExist(t, rm);
	exist(t, ['.untitled.tmp']);
	t.deepEqual(sm, expected(t, rm));
});

test('sync: remove all symlinks', t => {
	const sm = fn.sync(['**/*', '**/.*'], {cwd: t.context.path});

	notExist(t, fixtures);
	t.deepEqual(sm, expected(t, fixtures));
});

test('sync: dryRun - show all symlinks and don\'t remove', t => {
	const sm = fn.sync(['**/*', '**/.*'], {
		cwd: t.context.path,
		dryRun: true
	});

	exist(t, fixtures);
	t.deepEqual(sm, expected(t, fixtures));
});
