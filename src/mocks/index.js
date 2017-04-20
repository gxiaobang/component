/**
 * mock数据
 * @example
			http({
				url: '/test',
				baseURL: '/mock',
			}).then(response => {
				console.log(response);
			})
 */

import test from './test.json';
import login from './login.json';
import menu from './menu.json';

export default {
	'/test':  test,
  '/login': login,
  '/menu': menu
};