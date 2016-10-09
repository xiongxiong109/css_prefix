"use strict";

const autoprefixer = require('autoprefixer');
const postcss      = require('postcss');
const fs           = require('fs');
const async        = require('async');
const throttle     = require('lodash/throttle');

let cleaner  = postcss([ autoprefixer({ add: false, browsers: [] }) ]);
let prefixer = postcss([ autoprefixer ]);

let _throPrefixFile = throttle(prefixCssFile, 500);

var cssPath = `${__dirname}/css`;

readCompileCssDir();

// 监听文件变化
fs.watch(cssPath, (ev, file) => {
	console.log(`${file} has been changed, compiling...`);
	if (/\.css$/.test(file)) {
		_throPrefixFile(file);
	}

})

// 读取整个css目录下的文件并编译
function readCompileCssDir() {
	fs.readdir(cssPath, (err, filenames) => {

		if (err) throw err;
		async.each(filenames, (file) => {

			if (/\.css$/.test(file)) {
				prefixCssFile(file);
			}

		});

	});
}

function prefixCssFile(css) {

	fs.readFile(`${cssPath}/${css}`, (err, data) => {

		let cssStr = data.toString();
		cleaner.process(cssStr).then(function (cleaned) {
		    return prefixer.process(cleaned.css)
		}).then(function (result) {
		    savePrefixerCss(result.css, css);
		});

	});

}

function savePrefixerCss(css, cssName) {
	fs.writeFile(`${__dirname}/dest/${cssName}`, css, (err) => {
		if (err) throw err;
		console.log(`${__dirname}/dest/${cssName} write successed`);
	});
}