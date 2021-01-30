/** @format */

require('dotenv').config();

const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const styleLoaderConfig = require('./webpack.styles.partial.js');
const javascriptLoaderConfig = require('./webpack.javascript.partial.js');
const htmlLoaderConfig = require('./webpack.html.partial');

const getJavascriptRegex = (typescript) => {
	return typescript == 'yes' ? RegExp('.js$|.ts$|.tsx$') : RegExp('.js$|.jsx$');
};

const config = {
	entry_dir: process.env.ENTRY_DIR,
	output_dir: process.env.OUTPUT_DIR,
	js_framework: process.env.JS_FRAMEWORK,
	typescript: process.env.TYPESCRIPT,
	js_ext_regex: getJavascriptRegex(process.env.TYPESCRIPT),
	js_ext: process.env.JS_EXT,
	css_webpack: process.env.CSS_WEBPACK,
	html_webpack: process.env.HTML_WEBPACK,
	css_pre: process.env.CSS_PREPROCESSOR,
	css_pre_ext: RegExp(`.${process.env.CSS_PREPROCESSOR_EXT}$`),
};

module.exports = {
	mode: 'development',
	entry: `./${config.entry_dir}/index.${config.js_ext}`,
	output: {
		path: path.resolve(__dirname, `${config.output_dir}`), //default filename
		filename: 'main.js', //default path
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	module: {
		rules: []
			.concat({ test: config.js_ext_regex, exclude: /node_modules/, use: javascriptLoaderConfig(config.typescript) })
			.concat(config.css_webpack == 'yes' ? { test: config.css_pre_ext, use: styleLoaderConfig(config.css_pre) } : null)
			.filter(Boolean),
	},
	plugins: [htmlLoaderConfig(), new BundleAnalyzerPlugin()].filter(Boolean),
	devtool: 'source-map', //change for production
};
