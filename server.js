/**
 * 生产环境node代理
 */

const express = require('express');
const proxy = require('http-proxy-middleware');
const opn = require('opn');

const app = express();

const path = require('path');

// 参数获取
const port = '8080';
const host = '0.0.0.0';

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
app.use(express.static(path.resolve('./build')));

// 重定向到主页
app.get('*', (req, res) => {
	res.sendFile('xxx');
});


// 监听3000端口
app.listen(port, host, (err) => {
	if (err) throw err;
	console.log(`Listening at http:localhost:${port}`);
	opn(`http://localhost:${port}`);
});