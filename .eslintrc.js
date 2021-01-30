/** @format */

// https://eslint.org/docs/user-guide/configuring

// vscode settings: "eslint.run": "onSave"

require('dotenv').config();

let react = process.env.JS_FRAMEWORK == 'react';
let typescript = process.env.TYPESCRIPT == 'yes';
module.exports = {
	root: true, //tells ESLint that the config file is located in the root directory
	env: {
		browser: true, // recognize browser globals
		node: true, // recognize node globals
		commonjs: true, //recognize commonJS syntax
		es6: true, // recognize es6 syntax
		serviceworker: true, // recognize service-worker globals
	},
	extends: ['prettier']
		.concat(react ? 'plugin:react/recommended' : null)
		.concat(typescript ? 'plugin:@typescript-eslint/recommended' : 'eslint:recommended')
		.filter((x) => x), //inherits rules from base configurations, optional "eslint-config-" prefix omitted
	parser: typescript ? '@typescript-eslint/parser' : 'babel-eslint', //uses the babel parser instead of the default Espree parser to lint early-stage syntax
	parserOptions: {
		ecmaVersion: 11, //sets ecmascript version to ES11/ES2020
		sourceType: 'module', //specifies code as module-based vs script-tag based
		ecmaFeatures: {
			globalReturn: true, // allow return statements in the global scope
			impliedStrict: false, // enable global strict mode
			jsx: react ? true : false,
		},
	},
	plugins: []
		.concat(react ? 'react' : null)
		.concat(typescript ? '@typescript-eslint' : 'babel')
		.filter((x) => x), // installed plugins, optional "eslint-plugin-" prefix removed
	rules: {
		strict: 1,
		'react/prop-types': 'off',
		//'no-unused-vars': 'off',
	},
};
