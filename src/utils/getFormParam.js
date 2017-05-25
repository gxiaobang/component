/**
 * 获取表单参数
 */

import _ from 'lodash';

let reg = /\[\]$/;
const getFormParam = (form) => {
  let param = {};

  _.forEach(form.elements, (element) => {
    let name = element.name;

    if (name) {
      if (element.type == 'checkbox' || element.type == 'radio') {
        if (element.checked) {
          if (reg.test(name)) {
            name = name.replace(reg, '');
            if (!param[name]) param[name] = [];
            param[name].push(element.value);
          }
          else {
            param[ name ] = element.value || true;
          }
        }
      }
      else {
        if (reg.test(name)) {
          name = name.replace(reg, '');
          if (!param[name]) param[name] = [];
          param[name].push(element.value);
        }
        else {
          param[ name ] = element.value;
        }
      }
    }
  });

  return param;
}

export default getFormParam;