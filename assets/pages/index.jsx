const fns = {
	['dialog/index'](cb) {
		require.ensure([], require => {
			cb(require('pages/dialog/index').default);
		}, 'dialog/index');
	},
	['home/index'](cb) {
		require.ensure([], require => {
			cb(require('pages/home/index').default);
		}, 'home/index');
	},
	['message/index'](cb) {
		require.ensure([], require => {
			cb(require('pages/message/index').default);
		}, 'message/index');
	},
	['table/index'](cb) {
		require.ensure([], require => {
			cb(require('pages/table/index').default);
		}, 'table/index');
	},
	['tabs/index'](cb) {
		require.ensure([], require => {
			cb(require('pages/tabs/index').default);
		}, 'tabs/index');
	}
};
export default url => fns[ url ];