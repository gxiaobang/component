/**
 * 事件
 */

import suports from '@/utils/suports';

const evt = {
  // 添加事件
  add(elem, type, callback) {
    if (suports.is('addEventListener')) {
      elem.addEventListener(type, callback, false);
    }
    else {
      elem.attachEvent('on' + type, callback);
    }

    return () => {
      evt.remove(elem, type, callback);
    };
  },

  // 移除事件
  remove(elem, type, callback) {
    if (suports.is('removeEventListener')) {
      elem.removeEventListener(type, callback);
    }
    else {
      elem.detachEvent('on' + type, callback);
    }
  },

  // 修正事件
  fix(event) {
    event = event || window.event;

    if (!event.target) {
      event.target = event.srcElement;
    }

    if (!event.stopPropagation) {
      event.stopPropagation = () => {
        event.cancelBubble = true;
      };
    }

    if (!event.preventDefault) {
      event.preventDefault = () => {
        event.returnValue = false;
      };
    }

    return event;
  },

  // 事件委托
  delegate() {

  }
};

export default evt;