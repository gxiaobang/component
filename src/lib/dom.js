/**
 * DOM操作
 */

import _ from 'lodash';

// 获取dom节点
const getDOM = (expr, root = document) => {
  if (_.isString(expr)) {
    return root.querySelectorAll(expr);
  }
  else if (expr) {
    return _.isNumber(expr.length) ? expr : [expr];
  }
  else {
    return [];
  }
}

// 获取range
const getRange = () => {
  if (!getRange.range) {
    getRange.range = document.createRange();
  }
  return getRange.range;
}

// 解析html:string
const parseDOM = (html) => {
  var range = getRange();

  if (range.createContextualFragment) {
    return range.createContextualFragment(html);
  }
  else {
    var fragment = document.createDocumentFragment();
    var div = document.createElement('div');
    div.innerHTML = html;
    while (div.firstChild) {
      fragment.appendChild(div.firstChild);
    }
    return fragment;
  }
}

// DOM位置关系
const containsDOM = () => {
  if (e1.contains) {
    return e1.contains(e2);
  }
  else {
    return e1.compareDocumentPosition(e2) == 16;
  }
}

export { getDOM, parseDOM, containsDOM };