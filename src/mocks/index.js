/**
 * mock 数据
 */

const mocks = (url) => {
  url = url.replace(/^\//, '');

  return new Promise((resolve, reject) => {
    if (NODE_REFER != 'prod') {
      import('mockjs')
        .then((Mock) => {
          setTimeout(() => {
            import('mocks/' + url + '.json')
              .then(json => {
                json = Mock.mock(json);
                resolve({ data: json });
              });
          }, 500);  // 500ms后返回数据
        })
    }
  });
}

export default mocks;