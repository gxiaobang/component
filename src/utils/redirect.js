/**
 * 页面重定向
 */

const redirect = async (status, err, onReady) => {
  if (status == 'error') {
    console.error(err);
    let module;
    if (err.message.indexOf('Cannot find module') > -1) {
      module = await import('views/404');
    }
    else {
      module = await import('views/error');
    }

    return module.default;
  }
}


export default redirect;