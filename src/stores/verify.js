/**
 * 校验store
 */

import { observable, computed, action } from 'mobx';

class VerifyStoreItem {
  // @observable value = '';
  @observable error = '';

  constructor({ value, name, rules, error, label }) {
    this.value = value;
    this.name = name;
    this.rules = rules;
    this.error = error;
    this.label = label;
  }
}

class VerifyStore {
  items = [];
  
  addItem(item) {
    let storeItem = new VerifyStoreItem(item);
    this.items.push(storeItem);
    return storeItem;
  }

  removeItem(item) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] == item) {
        this.items.splice(i, 1);
        break;
      }
    }
  }

  // 通过name获取item
  updateError(name, error) {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (item.name == name) {
        item.error = error.replace(item.name, item.label);
        // item.update(error.replace(item.name, item.label));
      }
    }
  }
}


export default VerifyStore;