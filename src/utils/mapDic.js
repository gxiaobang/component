/**
 * 字典表map
 */

import { http } from '@/utils';

let dic;
// 请求字典表
const getDic = (onSuccess) => {
  http({
    url: '/basedata/basicParam/cache',
    onSuccess: (data) => {
      console.log(data);
      dic = data.data;
      onSuccess && onSuccess(data);
    }
  });
};

const mapDic = (key, val) => {
  let ret;

  // 报错警告
  if (!dic[ key ]) {
    dic[ key ] = {
      configMap: {},
      name: ''
    };
  }

  if (val) {
    ret = dic[ key ].configMap[ val ];
  }
  else {
    ret = dic[ key ].name;
  }

  return ret;
};

const dicOptions = {};
// 获取字典Array
const getDicOptions = (key) => {
  let options = [];

  if (!dicOptions[key]) {
    if (dic[ key ].configMap) {
      // 缓存options
      dicOptions[key] = options;
      for (let k2 in dic[ key ].configMap) {
        options.push({
          value: k2,
          label: dic[ key ].configMap[ k2 ]
        });
      }
      return options;
    }
  }
  else {
    return dicOptions[key];
  }
};

export default mapDic;
export { getDic, getDicOptions };