/**
 * 创建wrapper
 */

import React from 'react';
import ReactDOM from 'react-dom';

const wrapper = (container) => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return ReactDOM.render(container, div);
}

export default wrapper;