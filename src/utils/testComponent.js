/**
 * 组件测试
 */

import React from 'react';
// import ReactDOM from 'react-dom';
import { Dialog } from 'components';

const testComponent = (content) => {
  Dialog.closeCurrent();
  Dialog.insert({
    content,
    title: '组件测试',
    btns: [],
    animated: false
  });
}

export default testComponent;