/**
 * 特效
 * @example
 *   effects(elem)
 *     .frame('fadeOut')
 *     .then(() => {
 *       // complete
 *     })
 *
 *   effects(elem)
 *     .anim({
 *       from: {
 *       },
 *       to: {
 *       },
 *       duration: 500,
 *       tween: 'linear'
 *     })
 *     .then(() => {
 *       // complete
 *     })
 */

import { evt, css, cls } from '@/utils';
import _ from 'lodash';

// 动画帧 name, 完成 complete
const frame = (elem) => {
  return (name) => {
    if (!name) {
      return new Promise(resolve => resolve(elem));
    }

    cls.add(elem, 'animated');
    cls.add(elem, name);
    return new Promise((resolve, reject) => {
      let unbind = evt.add(elem, 'animationend', () => {
        unbind();
        cls.remove(elem, 'animated');
        cls.remove(elem, name);
        resolve(elem);
      });
    })
  }
}

const anim = (elem) => {
  return (options) => {
    let { tween = 'linear', duration = 400, from = {}, to = {} } = options;

    if (_.isNumber(duration)) {
      duration += 'ms';
    }

    css.set(elem, from);
    setTimeout(() => {
      css.set(elem, to);
      css.set(elem, { transition: `${duration} ${tween}` });
    })
    return new Promise((resolve, reject) => {
      let unbind = evt.add(elem, 'transitionend', () => {
        unbind();
        css.remove(elem, 'transition');
        resolve(elem);
      });
    })
  }
}

const effects = (elem) => {
  return {
    frame: frame(elem),
    anim: anim(elem)
  }
};

// global.effects = effects;

export default effects;