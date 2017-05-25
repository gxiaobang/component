/**
 * 获取元素所在的位置
 */

const getPoint = (el) => {
  let x = 0;
  let y = 0;
  while (el) {
    x += el.offsetLeft;
    y += el.offsetTop;

    el = el.offsetParent;
  }
  return { x, y };
}

export default getPoint;