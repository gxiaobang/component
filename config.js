/**
 * 参数配置
 */

const path = require('path');

const ROOT_PATH = path.resolve(__dirname);
const NODE_MODULES_PATH = path.resolve(ROOT_PATH, './node_modules');
const ASSETS_PATH = path.resolve(ROOT_PATH, './assets');
const DIST_PATH = path.resolve(ROOT_PATH, './dist');
const PUBLIC_PATH = 'http://cdn.xxx.com';

module.exports = {
	version: '1.0.0',
	// 本地地址
	host: '0.0.0.0',
	// 端口号
	port: 8000,
	// 根路径
	ROOT_PATH,
	// node_modules
	NODE_MODULES_PATH,
	// 资源路径
	ASSETS_PATH,
	// 编译路径
	DIST_PATH,

	path: {
		baseurl: './assets',
		dev: {
			src: './assets',
			dest: './dev'
		},
		build: {
			src: './assets',
			dest: './build'
		},
		page: {
			src: './assets/views',
			dest: './assets/page'
		},
		base: {
			src: './assets/base'
		},
		components: {
			src: './assets/components'
		}
	}
};