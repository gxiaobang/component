/**
 * cls 
 */

const cls = {

  add(elem, clsname) {
    if (!cls.contains(elem, clsname)) {
      elem.classList.add(clsname);
    }
  },

  remove(elem, clsname) {
    if (cls.contains(elem, clsname)) {
      elem.classList.remove(clsname);
    }
  },

  toggle(elem, clsname) {
    return elem.classList.toggle(elem, clsname);
  },

  contains(elem, clsname) {
    return elem.classList.contains(clsname);
  }
}

export default cls;