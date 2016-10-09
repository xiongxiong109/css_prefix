"use strict";

const autoprefixer = require('autoprefixer');
const postcss      = require('postcss');
const fs           = require('fs');
const async        = require('async');

let cleaner  = postcss([ autoprefixer({ add: false, browsers: [] }) ]);
let prefixer = postcss([ autoprefixer ]);

// 读取整个css目录下的文件
var cssPath = `${__dirname}/css`;
fs.readdir(cssPath, (err, filenames) => {

	if (err) throw err;
	async.each(filenames, (file) => {

		fs.readFile(`${cssPath}/${file}`, (err, data) => {
			console.log(data.toString());
		});

	});

});

// fs.readFile('./css/style.css', (err, data) => {

// 	if (err) throw err;

// 	let cssStr = data.toString();

// 	cleaner.process(cssStr).then(function (cleaned) {
// 	    return prefixer.process(cleaned.css)
// 	}).then(function (result) {
// 	    savePrefixerCss(result.css);
// 	});

// });

// function savePrefixerCss(css) {
// 	fs.writeFile('./dest/style.css', css, (err) => {
// 		if (err) throw err;
// 		console.log('file write successed');
// 	});
// }