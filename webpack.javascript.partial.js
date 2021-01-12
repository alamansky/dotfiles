module.exports = (usesTypescript) => {
	let typescript = usesTypescript == 'true';
	return typescript ? ['babel-loader', 'ts-loader'] : ['babel-loader'];
};
