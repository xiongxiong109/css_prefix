"use strict";

const autoprefixer = require('autoprefixer');
const postcss      = require('postcss');
const fs = require('fs');

var cleaner  = postcss([ autoprefixer({ add: false, browsers: [] }) ]);
var prefixer = postcss([ autoprefixer ]);

fs.readFile('./css/style.css', (err, data) => {

	if (err) throw err;

	let cssStr = data.toString();

	cleaner.process(cssStr).then(function (cleaned) {
	    return prefixer.process(cleaned.css)
	}).then(function (result) {
	    savePrefixerCss(result.css);
	});

});

function savePrefixerCss(css) {
	fs.writeFile('./dest/style.css', css, (err) => {
		if (err) throw err;
		console.log('file write successed');
	});
}