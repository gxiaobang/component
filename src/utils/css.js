/**
 * 样式操作
 */

import suports from 'utils/suports';

const getCss = (el, prop) => {
  // 标准
  if (suports.is('getComputedStyle')) {
    return window.getComputedStyle( el, '' )[ prop ] || null;
  }
  // IE8-
  else {
    // 透明度
    if (prop == 'opacity') {
      return (el.filters.alpha || el.filters['DXImageTransform.Microsoft.Alpha'] || 100) / 100;
    }
    else {
      return el.currentStyle[ prop ] || null;
    }
  }
}

const setCss = (el, prop, value) => {
  let props = {};
  if (arguments.length == 3 && typeof prop == 'string') {
    props[ prop ] = value;
  }
  else {
    props = prop;
  }

  for (let prop in props) {
    if (prop == 'opacity') {
      el.style.opacity = props[ prop ];
      el.style.filter = 'alpha(filter=' + (props[ prop ] / 100) + ')';
    }
    else if (isNaN( props[prop] )) {
      el.style[ prop ] = props[ prop ];
    }
    else {
      el.style[ prop ] = props[ prop ] + 'px';
    }
  }
}

export { getCss, setCss };