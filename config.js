/**
 * 参数配置
 */

const path = require('path');

const ROOT_PATH = path.resolve(__dirname);
const NODE_MODULES_PATH = path.resolve(ROOT_PATH, './node_modules');
const SRC_PATH = path.resolve(ROOT_PATH, './src');
const DIST_PATH = path.resolve(ROOT_PATH, './dist');
const PUBLIC_PATH = 'http://cdn.xxx.com';

module.exports = {
	// 版本号
	VERSION: '1.0.0',
	// 本地地址
	HOST: '0.0.0.0',
	// 端口号
	PORT: 8000,
	// 开发端口号
	DEV_PORT: 3000,
	// 根路径
	ROOT_PATH,
	// node_modules
	NODE_MODULES_PATH,
	// 资源路径
	SRC_PATH,
	// 编译路径
	DIST_PATH,
};