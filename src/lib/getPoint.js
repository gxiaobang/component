const getPoint = () => {
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