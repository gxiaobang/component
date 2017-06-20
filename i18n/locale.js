/**
 * 本地化
 */

// JSON 支持注释
require('json-comments');

const fs = require('fs');
const path = require('path');

// 递归读文件
function reRead(src, cb) {
  var stat = fs.statSync(src);

  // 目录
  if (stat.isDirectory()) {
    let dir = src;
    fs.readdirSync(src).forEach(file => {

      reRead(src + '/' + file, cb);
    });
  }
  // 文件
  else if (stat.isFile()) {
    // writeAction(file);
    cb && cb(src);
  }
  else {
    console.log('file is not exists');
  }
}

const locale = {
  use(type) {
    const lang = {};
    const common = require(`./common/${type}`);

    const all = {};
    ['common'].forEach((mod) => {
      reRead('./i18n/' + mod, (src) => {
        src = src.replace('./i18n/', './');
        let name = path.parse(src).name;
        if (name == type) {
          // console.log(src);
          Object.assign(lang, require(src));
        }
      });
    });

    Object.assign(lang, all);

    return lang;
  }
};

module.exports = locale;