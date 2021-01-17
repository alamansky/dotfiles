require('dotenv').config();

module.exports = () => {
	let config = null;
	if (process.env.HTML_WEBPACK == 'yes') {
		const HtmlWebpackPlugin = require('html-webpack-plugin');
		config = new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html',
		});
	}
	return config;
};
