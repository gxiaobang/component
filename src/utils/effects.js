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
 *         
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

import evt from 'utils/evt';
import css from 'utils/css';
import cls from 'utils/cls';
import _ from 'lodash';

// 动画帧 name, 完成 complete
const frame = (elem) => {
  return (name) => {
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

global.effects = effects;

export default effects;