/**
 * http请求入口
 */

import React from 'react';
import axios from 'axios';
import mocks from 'mocks';
import api from 'config/api.config';
import { Dialog } from 'components';
import _ from 'lodash';

console.log(api);
// const api = { dev: {} };
const NODE_REFER = 'dev';

let sysnames = Object.keys(api[NODE_REFER]);

// console.log(sysnames)

// 参数配置
const parameter = (options) => {

  let arr = options.url.split('/');
  let name = arr[0] || arr[1];
  if (NODE_REFER == 'prod') {
    if (sysnames.indexOf(name) > -1) {
      options.baseURL = api.prod[ name ];
    }
  }
  else {
    if (sysnames.indexOf(name) > -1) {
      options.url = `/proxy${options.url}`;
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
      else {
        let message = data.message;
        if (message) {
          if (!_.isArray(message)) message = [message];
          Dialog.alert(message.map((msg, index) => <div key={index}>{msg}</div>),  'warn');
        }
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