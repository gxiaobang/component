/**
 * 路由管理
 */

import querystring from 'querystring';
import { addEvent } from 'utils/event';
import { parse as parseURL } from 'url';

const location = global.location;
const history = global.history;

const router = {
	// 设置地址
	setURL(url) {
		if (this.isSuport()) {
			history.pushState(null, null, url);
		}
		else {
			location.hash = url ? ('#!' + url) : '';
		}
	},

	// 获取地址	
	getURL(url) {
		// let url;

		if (url) {
			return parseURL(url).pathname;
		}
		else {
			if (this.isSuport()) {
				return location.pathname;
			}
			else {
				return location.hash.replace(/^#!/, '');
			}
		}
	},

	// 获取views路径
	getPageURL(url) {
		// return url.replace(/^\//, '').replace(/\?(\w|\/|=){0,}/, '');
		return parseURL(url).pathname.replace(/^\//, '');
	},

	// 获取路径参数
	getQuery(url) {
		let param;

		if (url) {
			param = (parseURL(url).search || '').replace(/^\?/, '');
		}
		else {
			if (this.isSuport()) {
				param = location.search.replace(/^\?/, '');
			}
			else {
				param = location.hash.replace(/^#!(\w|\/)+\??/, '');
			}
		}

		return querystring.parse(param);
	},

	// 获取location
	getLocation(url) {
		return {
			path: this.getURL(url),
			query: this.getQuery(url)
		};
	},

	// 监听路径变化
	listen(fn) {
		if (this.isSuport()) {
			addEvent(window, 'popstate', function(event) {
				fn && fn.call(window, event);
			});
		}
	},

	// 支持h5 history
	isSuport() {
		return !'state' in history;
	}
};

export default router;