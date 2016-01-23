#!/usr/bin/env node
'use strict';

/**
 * Dependencies
 */

var resolveFrom = require('resolve-from');
var getStdin = require('get-stdin');
var arrify = require('arrify');
var rework = require('rework');
var meow = require('meow');
var fs = require('mz/fs');


/**
 * CLI
 */

var cli = meow([
	'Usage',
	'  $ cssor [options] [file]',
	'',
	'Options',
	'  --transform, -t   Use a transformer for source files',
	'  --output, -o      Write output to file',
	'  --basedir, -b     Set base dir for input file',
	'',
	'Examples',
	'  $ cat app.css | cssor -t myth -o dist/app.css',
	'  $ cssor -i app.css -t myth > dist/app.css'
].join('\n'), {
	alias: {
		t: 'transform',
		b: 'basedir',
		i: 'input',
		o: 'output'
	}
});

var filename;
var input;

if (cli.input.length > 0) {
	filename = cli.input[0];
	input = fs.readFile(filename, 'utf8');
} else {
	filename = 'app.css';
	input = getStdin();
}

input.then(function (source) {
	var processor = rework(source, { source: filename });
	var transformers = arrify(cli.flags.transform);

	transformers.forEach(function (name) {
		var path = resolveFrom(process.cwd(), name);

		processor.use(require(path)());
	});

	if (cli.flags.basedir) {
		process.chdir(cli.flags.basedir);
	}

	var output = processor.toString();

	if (cli.flags.output) {
		fs.writeFile(cli.flags.output, output, 'utf8');
	} else {
		process.stdout.write(output);
	}
}).catch(function (err) {
	console.error(err.stack);
});
