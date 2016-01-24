# CSSOR

<h1 align="center">
	<br>
	<img width="300" src="https://cdn.rawgit.com/vdemedes/cssor/master/media/logo.svg" alt="CSSOR">
	<br>
	<br>
	<br>
</h1>

[Browserify](https://github.com/substack/node-browserify) for CSS.


## Installation

```
$ npm install --global cssor
```


## Usage

```
$ cssor --help

	Usage
    $ cssor [options] [file]

  Options
    --transform, -t   Use a transformer for source files
    --output, -o      Write output to file
    --basedir, -b     Set base dir for input file

  Examples
    $ cat app.css | cssor -t myth -o dist/app.css
    $ cssor -i app.css -t myth > dist/app.css
```


## Options

### transform

Add a transformer ([rework](https://github.com/reworkcss/rework) plugin).
Can be set multiple times.

```
$ cssor -t rework-npm -t myth
```

### output

Write output to the file, instead of stdout.

```
$ cssor -o dist/app.css
```

### basedir

Change base directory for @import in stylesheets.

```
$ cssor -b styles
```


## License

MIT © [Vadim Demedes](https://github.com/vdemedes)
