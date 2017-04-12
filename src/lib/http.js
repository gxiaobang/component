/**
 * http请求入口
 */

import axios from 'axios';
import mock from 'mock';

const http = (options = {}) => {
	const { baseURL = '/api', url } = options;
	// mock请求
	if (baseURL == '/mock') {
		/*return Promise.resolve({
			data: mock[url] || null
		});*/

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({ data: mock[url] || null })
			}, 1000);		// 1s后返回数据
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