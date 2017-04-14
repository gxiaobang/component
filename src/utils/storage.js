/**
 * 浏览器存贮
 */

// cookie获取
const cookie = {
  get(key) {
    let items = document.cookie.split('; ');
    for (let i = 0; i < items.length; i++) {
      // items
      let array = items[i].split('=');

      if (array[0] == key) {
        return array[i];
      }
    }
    return null;
  },
   
  set(key, val, exp) {
    document.cookie = `${key}=${val}`;
  },

  has(key) {
    return this.get(key);
  }
};

// 本地存贮
const storage = {
  // 判断支持
  isSuport() {
    return 'localStorage' in window;
  },
  // 设置
  set(key, val) {
    if (this.isSuport()) {
      localStorage.setItem(key, val);
    }
    else {
      cookie.set(key, val);
    }
  },
  // 获取
  get(key) {
    if (this.isSuport()) {
      return localStorage.getItem(key);
    }
    else {
      return cookie.get(key);
    }
    return null;
  },
  // key值是否存在
  has(key) {
    return this.get(key) != null;
  }
};

// seesion存贮, 新开浏览器tab或关闭浏览器会销毁
const session = {

};

export { cookie, storage, session };