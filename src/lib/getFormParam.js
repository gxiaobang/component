/**
 * 获取表单参数
 */

import _ from 'lodash';

const getFormParam = (form) => {
  let param = {};

  _.forEach(form.elements, (element) => {
    if (element.name) {

      if (element.type == 'checkbox' || element.type == 'radio') {
        if (element.checked) {
          param[ element.name ] = param.value || true;
        }
      }
      else {
        param[ element.name ] = element.value;
      }
    }
  });

  return param;
}

export default getFormParam;