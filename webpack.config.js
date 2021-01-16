/** @format */

require('dotenv').config();

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const styleLoaderConfig = require('./webpack.styles.partial.js');
const javascriptLoaderConfig = require('./webpack.javascript.partial.js');

const getJavascriptRegex = (usesTypescript) => {
	let typescript = usesTypescript == 'true';
	return typescript ? RegExp('.js$|.ts$|.tsx$') : RegExp('.js$|.jsx$');
};

const config = {
	entry_dir: process.env.ENTRY_DIR,
	output_dir: process.env.OUTPUT_DIR,
	js_framework: process.env.JS_FRAMEWORK,
	js_superset: process.env.TYPESCRIPT,
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
			.concat({ test: config.js_ext_regex, exclude: /node_modules/, use: javascriptLoaderConfig(config.js_superset) })
			.concat(config.css_webpack ? { test: config.css_pre_ext, use: styleLoaderConfig(config.css_pre) } : null)
			.filter((x) => x),
	},
	plugins: []
		.concat(
			config.html_webpack
				? new HtmlWebpackPlugin({
						template: './src/index.html',
						filename: './index.html',
				  })
				: null,
		)
		.filter((x) => x),
	devtool: 'source-map', //change for production
};
