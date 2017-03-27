/**
 * 路由管理
 */

const router = {
	// 设置地址
	setURL(url) {
		window.location.hash = url ? ('#!' + url) : '';
	},

	// 获取地址
	getURL() {
		return window.location.hash.replace(/^#!/, '');
	}
};

export default router;