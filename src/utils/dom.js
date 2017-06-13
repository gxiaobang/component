/**
 * DOM操作
 */

import _ from 'lodash';

const dom = {
  // 获取元素
  get(expr, root = document) {
    if (_.isString(expr)) {
      return root.querySelectorAll(expr);
    }
    else if (expr) {
      return _.isNumber(expr.length) ? expr : [expr];
    }
    else {
      return [];
    }
  },

  // 将string转换成DOM
  parse(shtml) {
    var range = getRange();

    if (range.createContextualFragment) {
      return range.createContextualFragment(shtml);
    }
    else {
      var fragment = document.createDocumentFragment();
      var div = document.createElement('div');
      div.innerHTML = shtml;
      while (div.firstChild) {
        fragment.appendChild(div.firstChild);
      }
      return fragment;
    }
  },

  // 包含关系
  contains(e1, e2) {
    if (!e1) return false;

    if (e1.contains) {
      return e1.contains(e2);
    }
    else {
      return e1.compareDocumentPosition(e2) == 16;
    }
  }
};


export default dom;