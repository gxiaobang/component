/**
 * http请求入口
 */

import axios from 'axios';

const http = (option = {}) => {

	let instance = axios.create({
		baseURL: 'https://xxx',
		timeout: 1000
	});

	return instance.request(option);
};

export { http };