/**
 * http请求入口
 */

import axios from 'axios';
import mocks from 'mocks';
import api from 'api';
import _ from 'lodash';

// 参数配置
const parameter = (options) => {

	let arr = options.url.split('/');
	let name = arr[0] || arr[1];
	if (process.env.NODE_ENV === 'production') {
	  switch (name) {
	    // 基础数据
	    case 'basedata':
	      options.baseURL = api.prod[ name ];
	      break;
	  }
	}
	else {
		// console.log(name)
		switch (name) {
			case 'basedata':
				options.url = options.url.replace(/^\//, '/proxy-');
				break;
		}
	}

  return options;
};

const http = (options = {}) => {
  const { baseURL = '/api', url, param } = options;

  let promise;
  // mock请求
  if (options.mock) {
    promise = mocks(url, param);
  }
  else {
    promise = axios(parameter(options));
  }

  if (_.isFunction(options.onSuccess)) {
    promise.then(response => {
      const data = response.data;

      // 请求成功
      if (data.code == 'SUCCESS') {
        options.onSuccess(data);
      }
    });
  }

  if (_.isFunction(options.onComplete)) {
    promise
      .then(response => {
        options.onComplete(response);
      })
      .catch(error => {
        options.onComplete(error.response);
      });
  }

  // 请求异常处理
  promise.catch(error => {
    console.log(error);
  });

  return promise;
};

export default http;