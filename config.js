/**
 * 参数配置
 */

const path = require('path');

const rootPath = path.resolve(__dirname);
const nodeModulesPath = path.resolve(rootPath, './node_modules');
const srcPath = path.resolve(rootPath, './src');
const distPath = path.resolve(rootPath, './dist');
const publicPath = '/';

// 请求接口配置
const api = {
	// 开发环境
	dev: {
		basedata: 'http://10.0.31.72:8080/basedata',
	},
	// 测试环境
	test: {
		basedata: ''
	},
	// 生产环境
	prod: {
		basedata: ''
	}
};

module.exports = {
	// 版本号
	version: '1.0.0',
	// 本地地址
	host: '0.0.0.0',
	// 端口号
	port: 8000,
	// 开发端口号
	devPort: 3000,
	// 根路径
	rootPath,
	// node_modules
	nodeModulesPath,
	// 资源路径
	srcPath,
	// 编译路径
	distPath,
	// cdn地址
	publicPath,
	// 接口
	api
};