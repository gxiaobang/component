/**
 * gulp参数配置
 */

module.exports = {
	path: {
		build: {
			src: './build'
		},
		action: {
			src: './assets/action'
		},
		view: {
			src: './assets/view/',
			dest: './assets/action/'
		},
		component: {
			src: './assets/component/'
		}
	}
};