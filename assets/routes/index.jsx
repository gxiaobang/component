const fns = {
	['dialog/index'](cb) {
		require.ensure([], require => {
			cb(require('routes/dialog/index').default);
		}, 'dialog/index');
	},
	['message/index'](cb) {
		require.ensure([], require => {
			cb(require('routes/message/index').default);
		}, 'message/index');
	},
	['table/index'](cb) {
		require.ensure([], require => {
			cb(require('routes/table/index').default);
		}, 'table/index');
	},
	['tabs/index'](cb) {
		require.ensure([], require => {
			cb(require('routes/tabs/index').default);
		}, 'tabs/index');
	}
};
export default url => fns[ url ];