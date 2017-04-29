/**
 * http请求入口
 */

import axios from 'axios';
import mocks from 'mocks';
import _ from 'lodash';

// 参数配置
const parameter = (options) => {
  switch (options.target) {
    // 基础数据
    case 'basedata':
      options.baseURL = '/proxy-01';
      break;
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