/**
 * 加载中
 * @example
 *   <Spin></Spin>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Icon } from '@/components';
import './style';

class Spin extends React.Component {
  render() {
    return (
      <div className="spin-wrapper">
        <Icon type="spinner" size={16} spin />
        <span>{this.props.children || __('loading')}</span>
      </div>
    );
  }
}

export default Spin;