var FILE_ENCODING = 'utf-8',

EOL = '\n';

var fs = require('fs');
var path = require('path');
var Mustache = require('mustache');
var pkg = require('./package.json');

function readFile(filename) {
  return fs.readFileSync(filename, FILE_ENCODING);
}

function concat(opts) {
  var bannerContent = Mustache.render(readFile(opts.banner), { pkg: pkg } )
	var fileContent = bannerContent + readFile(opts.src);

	fs.writeFileSync(opts.dest, fileContent, FILE_ENCODING);
	console.log(' '+ opts.dest +' built.');
}

concat({
	src : 'lib/feature-toggle-service.js',
	banner : '.banner',
	dest : 'lib/feature-toggle-service.js'
})

concat({
	src : 'lib/feature-toggle-service.min.js',
	banner : '.banner',
	dest : 'lib/feature-toggle-service.min.js'
})
