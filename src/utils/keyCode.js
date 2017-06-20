/**
 * 键盘值
 */

const keyCodes = {
  13: 'enter',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  112: 'f1',
  113: 'f2',
  114: 'f3',
  115: 'f4',
  116: 'f5'
};

export default (code) => {
  return {
    get typeName() {
      return keyCodes[ code ];
    },
    is(type) {
      return this.typeName === type;
    },
    not(type) {
      return !this.is(type);
    }
  }
}