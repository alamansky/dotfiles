require('dotenv').config();

module.exports = () => {
	return process.env.TYPESCRIPT == 'yes' ? ['babel-loader', 'ts-loader'] : ['babel-loader'];
};
