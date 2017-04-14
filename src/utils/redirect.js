/**
 * 页面重定向
 */

const redirect = (status, err, onReady) => {
  if (status == 'error') {
    console.error(err);
    if (err.message.indexOf('Cannot find module') > -1) {
      System.import('views/404')
        .then(module => {
          const Page = module.default;
          onReady && onReady(Page);
        });
    }
    else {
      System.import('views/error')
        .then(module => {
          const Page = module.default;
          onReady && onReady(Page);
        });
    }
  }
}


export default redirect;