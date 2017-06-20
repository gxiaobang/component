/**
 * home store
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { observable, computed } from 'mobx';
import redirect from '@/utils/redirect';
import router from '@/utils/router';
import { session } from '@/utils/storage';
import { Spin } from '@/components';

// 更新菜单session存贮
const updateSession = (items) => {
  // 延时更新session
  setTimeout(() => {
    let arr = [];
    items.forEach(item => {
      arr.push({
        title: item.title,
        url: item.url,
        code: item.code,
        active: item.active
      });
    });
    session.set('MENU_DATA', JSON.stringify(arr));
  });
}


class MenuItem {
  id = Math.random();

  @observable title = '';
  @observable url = '';
  @observable code = '';
  @observable active = false;
  @observable PageNode = <Spin />;
  constructor({ title, url, code, active = false }) {

    const data = { title, url, code, active };

    data.location = router.getLocation(url);

    Object.assign(this, data);
    this.importPage(data);
  }

  // 导入页面
  importPage(data) {
    let url = router.getPageURL(data.url);
    // let url = data.url.replace(/^\//, '').replace(/\?(\w|\/|=){0,}/, '');
    import('@/views/' + url + '.jsx')
      .then(module => {
        // console.log(module)
        const Page = module.default;
        this.PageNode = <Page ref={(page) => this.page = page} code={data.code} location={data.location} data={data} />;
      })
      .catch(err => {
        redirect('error', err).then(Page => {
          this.PageNode = <Page code={data.code} location={data.location} />;
        });
        throw err;
      });
  }
}

class MenuStore {
  // 打开的菜单
  @observable items = [];
  // 所有的菜单
  @observable all = [];

  @computed get currentCode() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[ i ].active) {
        return this.items[ i ].code;
      }
    }
    return null;
  }

  constructor() {
    const MENU_DATA = JSON.parse(session.get('MENU_DATA'));

    if (MENU_DATA) {
      /*MENU_DATA.forEach(item => {
        this.addItem(item, false);
      });*/

      // console.log(this.items)
    }
  }


  // 清除选中
  clearSelect() {
    this.items.forEach(item => {
      if (item.active) {
        item.active = false;
      }
    });
  }

  // 选中数据
  selectItem(code) {
    this.items.forEach(item => {
      if (!item.active && item.code == code) {
        this.clearSelect();
        item.active = true;

        updateSession(this.items);
      }
    });
  }

  // 添加
  addItem(item, isClear = true) {

    // 设置url为唯一code
    if (!item.code) {
      item.code = item.url;
    }

    if (!this.hasItem(item.code)) {
      // 清除选中
      if (isClear) this.clearSelect();

      // console.log(item)

      this.items.push(
        new MenuItem(item)
      );
      updateSession(this.items);
      return false;
    }
    else {
      return true;
    }
  }

  // 是否添加过
  hasItem(code) {
    return !!this.getItem(code);
  }

  // 获取
  getItem(code) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].code == code) {
        return this.items[i];
      }
    }
    return null;
  }

  // 移除
  removeItem(code) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].code == code) {
        this.items.splice(i, 1);
        // return true;
        updateSession(this.items);
        return i;
      }
    }
    return -1;
  }

  // 更新菜单
  updateList(items) {
    this.all.push(...items);
  }

  // 清空
  empty() {
    this.items = [];
  }

  // 打开
  open(item) {
    // 清空数据数据
    this.empty();

    item.active = true;
    const added = this.addItem(item);

    // 已经添加过
    if (added) {
      this.selectItem(item.code);
    }

    document.title = item.title + ' - ' + '东呈国际酒店集团';
    router.setURL(item.url, { lang: global.lang });
  }

  // 临时
  openTemp(item) {
    item.active = true;
    const added = this.addItem(item);

    // 已经添加过
    if (added) {
      this.selectItem(item.code);
    }
  }

  // 关闭
  close(item) {
    let index = this.removeItem(item.code);
    if (index > -1 && item.active) {
      // 重置上一个为选中
      let n = Math.min(index, this.items.length - 1);
      let url = '/';
      if (this.items[ n ]) {
        this.items[ n ].active = true;
        url = this.items[ n ].url;
      }
      router.setURL(url);
    }
  }

  // 关闭当前窗口
  closeCurrent() {
    // console.log(this.items)

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].active) {
        this.close(this.items[i]);
        break;
      }
    }
  }

  // 刷新数据
  refresh(code, method = 'refresh') {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].code == code) {
        this.items[i].page[method]();
        this.selectItem(code);
        break;
      }
    }
  }
}

export { MenuItem, MenuStore };