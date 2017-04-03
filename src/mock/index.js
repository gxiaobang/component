/**
 * mock数据
 * @example
			http({
				url: '/test/list',
				baseURL: '/mock',
			}).then(response => {
				console.log(response);
			})
 */
import test from './test.json';

export default {
	'/test/list':  test
};