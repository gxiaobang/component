/**
 * http请求入口
 */

import axios from 'axios';
import mocks from 'mocks';

const http = (options = {}) => {
	const { baseURL = '/api', url } = options;
	// mock请求
	if (baseURL == '/mock') {
		/*return Promise.resolve({
			data: mocks[url] || null
		});*/

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({ data: mocks[url] || null })
			}, 500);		// 500ms后返回数据
		});
	}
	else {
		let instance = axios.create({
			baseURL, url
		});
		return instance.request(options);
	}
};

export default http;