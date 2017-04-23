/**
 * mock数据
 */

import Mock from 'mockjs';

const mocks = (url) => {
  url = url.replace(/^\//, '');

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      setTimeout(() => {
        System.import('mocks/' + url + '.json')
          .then(json => {
            json = Mock.mock(json);
            resolve({ data: json });
          });
      }, 500);  // 500ms后返回数据
    }
  });
}

export default mocks;