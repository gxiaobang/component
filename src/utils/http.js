/**
 * http请求入口
 */

import axios from 'axios';
import mocks from 'mocks';

const http = (options = {}) => {
	const { baseURL = '/api', url, param } = options;
	// mock请求
	if (baseURL == '/mock') {
		/*return Promise.resolve({
			data: mocks[url] || null
		});*/
		return mocks(url, param);
	}
	else {
		let instance = axios.create({
			baseURL, url
		});
		return instance.request(options);
	}
};

export default http;