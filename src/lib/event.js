/**
 * 事件
 */

import suports from 'lib/suports';
import { getDOM, parseDOM } from 'lib/dom';

// 绑定事件
const addEvent = (el, type, fn) => {
  if (suports.is('addEventListener')) {
    el.addEventListener(type, fn, false);
  }
  else {
    el.attachEvent('on' + type, fn);
  }
}

// 删除事件
const removeEvent = (el, type, fn) => {
  if (suports.is('removeEventListener')) {
    el.removeEventListener(type, fn);
  }
  else {
    el.detachEvent('on' + type, fn);
  }
}

// 触发事件
const triggerEvent = (el, type, fn) => {
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
}

// 事件委托
const delegate = () => {

}

export { addEvent, removeEvent, triggerEvent };