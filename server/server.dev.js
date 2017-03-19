/**
 * webpack热启动
 */

var webpack = require('webpack'),
		WebpackDevServer = require('webpack-dev-server'),
		opn = require('opn');

var config = require('../webpack/webpack.config.dev');

const port = 8002;

config.entry.app.unshift(
		`webpack-dev-server/client?http://localhost:${port}`,
		'webpack/hot/only-dev-server'
	);

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
	// publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	inline: true,
	progress: true,
	// contentBase: './assets',
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
server.listen(port, 'localhost', (err) => {
	if (err) throw err;
	console.log(`Listening at http:localhost:${port}`);
	opn(`http://localhost:${port}`);
});