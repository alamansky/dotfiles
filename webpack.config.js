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
	js_framework: process.env.JS_FRAMEWORK,
	js_superset: process.env.TYPESCRIPT,
	js_ext_regex: getJavascriptRegex(process.env.TYPESCRIPT),
	js_ext: process.env.JS_EXT,
	css_pre: process.env.CSS_PREPROCESSOR,
	css_pre_ext: RegExp(`.${process.env.CSS_PREPROCESSOR_EXT}$`),
};

module.exports = {
	mode: 'development',
	entry: `./src/index.${config.js_ext}`,
	output: {
		path: path.resolve(__dirname, 'dist'), //default filename
		filename: 'main.js', //default path
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	module: {
		rules: [
			{ test: config.js_ext_regex, exclude: /node_modules/, use: javascriptLoaderConfig(config.js_superset) },
			{
				test: config.css_pre_ext,
				use: styleLoaderConfig(config.css_pre),
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
	],
	devtool: 'source-map', //change for production
};
