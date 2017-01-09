/**
 * webpack热启动
 */

var webpack = require('webpack'),
		WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config');
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	stats: {
		color: true,
		hash: false,
		timings: true,
		chunks: false,
		chunkModules: false,
		modules: false
	}
});

// 监听3000端口
server.listen(3000, 'localhost', (err) => {
	if (err) throw err;
	console.log('Listening at http:localhost:3000');
});