/**
 * 路由管理
 */

import querystring from 'querystring';
import { addEvent } from 'utils/event';

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
	getURL() {
		let url;
		if (this.isSuport()) {
			return location.pathname;
		}
		else {
			return location.hash.replace(/^#!/, '');
		}

		return url;
	},

	// 获取路径参数
	getQuery() {
		let param;
		if (this.isSuport()) {
			param = location.search.replace(/^\?/, '');
		}
		else {
			param = location.hash.replace(/^#!(\w|\/)+\??/, '');
		}

		return querystring.parse(param);
	},

	// 获取location
	getLocation() {
		return {
			path: this.getURL(),
			query: this.getQuery()
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
		return 'state' in history;
	}
};

export default router;