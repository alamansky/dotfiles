/** @format */

// https://stylelint.io/user-guide/rules/

// GUI configurator: https://maximgatilin.github.io/stylelint-config/

// vscode settings:  "css.validate": false,
//  				 "less.validate": false,
//  				 "scss.validate": false,

let hasProcessor = process.env.CSS_PREPROCESSOR != 'none';

module.exports = {
	extends: ['stylelint-config-standard'],
	// per https://github.com/kristerkari/stylelint-scss
	// stylelint-scss workds with less and similar preprocessor syntaxes
	plugins: [hasProcessor ? 'stylelint-scss' : ''],
	rules: {
		indentation: 'tab',
		'string-quotes': 'single',
		'no-duplicate-selectors': true,
		'color-hex-case': 'upper',
		'color-hex-length': 'short',
		'color-named': 'never',
		'color-no-hex': true,
		'selector-no-qualifying-type': true,
		'selector-combinator-space-after': 'always',
		'selector-attribute-quotes': 'always',
		'declaration-block-trailing-semicolon': 'always',
		'declaration-colon-space-before': 'never',
		'declaration-colon-space-after': 'always',
		'property-no-vendor-prefix': true,
		'value-no-vendor-prefix': true,
		'number-leading-zero': 'always',
		'function-url-quotes': 'always',
		'comment-whitespace-inside': 'always',
		'comment-empty-line-before': 'never',
		'at-rule-no-vendor-prefix': true,
		'rule-empty-line-before': null,
		'selector-pseudo-element-colon-notation': 'double',
		'selector-no-vendor-prefix': true,
		'media-feature-name-no-vendor-prefix': true,
		'at-rule-no-unknown': null,
	},
};
