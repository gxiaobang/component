/**
 * 样式操作
 */

import suports from '@/utils/suports';

const css = {
  get(elem, props) {
    // 标准
    if (suports.is('getComputedStyle')) {
      return window.getComputedStyle(elem, '')[ props ] || null;
    }
    // IE8-
    else {
      // 透明度
      if (props == 'opacity') {
        return (elem.filters.alpha || elem.filters['DXImageTransform.Microsoft.Alpha'] || 100) / 100;
      }
      else {
        return elem.currentStyle[ props ] || null;
      }
    }
  },

  set(elem, name, value) {
    let props = {};
    if (arguments.length == 3 && typeof name == 'string') {
      props[ name ] = value;
    }
    else {
      props = name;
    }

    for (let name in props) {
      if (name == 'opacity') {
        elem.style.opacity = props[ name ];
        elem.style.filter = 'alpha(filter=' + (props[ name ] / 100) + ')';
      }
      else if (isNaN( props[name] )) {
        elem.style[ name ] = props[ name ];
      }
      else {
        elem.style[ name ] = props[ name ] + 'px';
      }
    }
  },

  remove(elem, name) {
    elem.style[name] = '';
  }
};

export default css;