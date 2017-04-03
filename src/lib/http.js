/**
 * http请求入口
 */

import axios from 'axios';
import mock from 'mock';

const http = (option = {}) => {

	// mock请求
	if (option.baseURL == '/mock') {
		return Promise.resolve({
			data: mock[option.url] || null
		});
	}
	else {
		let instance = axios.create({
			baseURL: baseURL || '/api',
			timeout: 1000
		});
		return instance.request(option);
	}
};

export default http;