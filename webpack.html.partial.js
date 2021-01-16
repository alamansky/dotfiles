require('dotenv').config();

module.exports = async () => {
	let config = null;
	if (process.env.HTML_WEBPACK) {
		const HtmlWebpackPlugin = await import('html-webpack-plugin');
		config = new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html',
		});
	}
	return config;
};
