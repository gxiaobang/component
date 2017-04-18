/**
 * 分页组件
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Icon } from 'components';
import './style';

class Pagination extends React.Component {
  render() {
    return (
      <div className="rc-smart-spin-wrap">
        <Icon type="spinner" className="spin" />
        <span>加载中...</span>
      </div>
    );
  }
}

export default Pagination;