/**
 * webpack热启动
 */

var webpack = require('webpack'),
		WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	quiet: false,
	noInfo: false,
	// lazy: true,
	historyApiFallback: true,
	stats: { colors: true }
}).listen(3000, '127.0.0.1', err => {
	if (err) throw err;
	console.log(`Listening at location:3000`);
});