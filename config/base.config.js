/**
 * 参数配置
 */

const path = require('path');

const rootPath = path.resolve(__dirname, '..');
const nodeModulesPath = path.resolve(rootPath, './node_modules');
const srcPath = path.resolve(rootPath, './src');
const distPath = path.resolve(rootPath, './dist');
const publicPath = '/';

module.exports = {
	// 版本号
	version: '1.0.0',
	// 端口号
	port: 8000,
	// 开发端口号
	devPort: 3000,
	// 语言
	lang: 'zh-cn',
	// 根路径
	rootPath,
	// node_modules
	nodeModulesPath,
	// 资源路径
	srcPath,
	// 编译路径
	distPath,
	// cdn地址
	publicPath
};