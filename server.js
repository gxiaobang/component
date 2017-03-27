/**
 * 请求代理
 */

const express = require('express');
const proxy = require('http-proxy-middleware');
const opn = require('opn');

const app = express();
const path = require('path');
const { version, host, port, SRC_PATH, DIST_PATH, PUBLIC_PATH } = require('./config');

// 真实服务器
app.use('/api', proxy({
	target: 'xxx', // 代理服务的地址,
	changeOrigin: true,
	pathRewrite: {
		'^/api': ''
	}
}));

// mock服务器
app.use('/mock', proxy({
	target: 'xxx', // 代理服务的地址,
	changeOrigin: true,
	pathRewrite: {
		'^/mock': ''
	}
}));

// 静态文件
app.use(express.static(DIST_PATH));

// 重定向到主页
app.get('*', (req, res) => {
	res.sendFile(`${DIST_PATH}/index.${version}.html`);
});


// 监听3000端口
app.listen(port, host, (err) => {
	if (err) throw err;
	console.log(`Listening at http://localhost:${port}`);
	opn(`http://localhost:${port}`);
});