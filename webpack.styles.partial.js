module.exports = (preprocessor) => {
	let config = [
		{
			loader: 'style-loader',
			options: {},
		},
		{
			loader: 'css-loader',
			options: {},
		},
		{
			loader: `${preprocessor}-loader`,
			options: {},
		},
	];
	return preprocessor ? config : config.slice(0, 2);
};
